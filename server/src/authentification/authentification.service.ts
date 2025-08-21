import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentification } from './entities/authentification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthentificationService {
  private readonly googleClient: OAuth2Client;
  private readonly logger = new Logger(AuthentificationService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(Authentification)
    private readonly authentificationRepository: Repository<Authentification>,
  ) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const redirectUrl = this.configService.get<string>('GOOGLE_REDIRECT_URL');

    if (!clientId || !clientSecret || !redirectUrl) {
      this.logger.error(
        'Faltan variables de entorno de Google (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL)',
      );
      throw new Error(
        'Configuración de Google OAuth incompleta. Verifica tus variables de entorno.',
      );
    }

    this.googleClient = new OAuth2Client(clientId, clientSecret, redirectUrl);
  }

  getGoogleAuthUrl(): string {
    const url = this.googleClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
    });
    this.logger.debug(`Google Auth URL generado: ${url}`);
    return url;
  }

  async validateGoogleUser(code: string): Promise<{ token: string }> {
    try {
      this.logger.log(`Validando código de Google OAuth...`);

      const { tokens } = await this.googleClient.getToken(code);
      if (!tokens.id_token) {
        this.logger.warn(`El token de Google no incluye id_token`);
        throw new UnauthorizedException(
          'Google no retornó un id_token válido.',
        );
      }

      this.googleClient.setCredentials(tokens);

      const ticket = await this.googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        this.logger.warn(`Payload inválido recibido de Google: ${JSON.stringify(payload)}`);
        throw new BadRequestException(
          'No se pudo verificar la identidad del usuario de Google.',
        );
      }

      this.logger.log(`Usuario de Google verificado: ${payload.email}`);

      // Buscar si el usuario ya existe
      let user = await this.authentificationRepository.findOne({
        where: { email: payload.email },
      });

      if (!user) {
        this.logger.log(
          `Usuario nuevo detectado: ${payload.email}, creando en base de datos...`,
        );

        user = this.authentificationRepository.create({
          name: payload.name,
          email: payload.email,
          emailVerified: payload.email_verified,
          pictureUrl: payload.picture,
          provider: 'Google',
        });

        await this.authentificationRepository.save(user);
        this.logger.log(`Usuario ${payload.email} creado exitosamente.`);
      } else {
        this.logger.debug(`Usuario ${payload.email} ya existe en la base de datos.`);
      }

      // Firmar JWT con info del usuario
      const jwtPayload = {
        sub: user._uuid,
        email: user.email,
        name: user.name,
        provider: user.provider,
      };

      const token = this.jwtService.sign(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h',
      });

      this.logger.log(`JWT emitido para ${user.email}`);
      return { token };
    } catch (err) {
      this.logger.error(
        `Error durante la validación con Google OAuth: ${err.message}`,
        err.stack,
      );
      throw new UnauthorizedException(
        'Ocurrió un error en la validación con Google.',
      );
    }
  }

  async validateJwt(token: string) {
    try {
      if (!token) {
        this.logger.warn('No se recibió un token para validar.');
        throw new UnauthorizedException('Token no proporcionado.');
      }

      const secret = this.configService.get<string>('JWT_SECRET');
      if (!secret) {
        this.logger.error('JWT_SECRET no configurado en variables de entorno.');
        throw new Error('Falta configuración del servidor.');
      }

      // Verificar token
      const decoded = this.jwtService.verify(token, { secret });

      this.logger.debug(`Token válido para usuario: ${decoded.email}`);

      // Validar contra la base de datos (opcional, para asegurarnos que el user existe)
      const user = await this.authentificationRepository.findOne({
        where: { email: decoded.email },
      });

      if (!user) {
        this.logger.warn(
          `Token válido pero el usuario ${decoded.email} no existe en DB.`,
        );
        throw new UnauthorizedException('Usuario no encontrado.');
      }

      return user; // <- devolvemos la entidad del usuario autenticado
    } catch (err) {
      this.logger.error(
        `Error al validar JWT: ${err.message}`,
        err.stack,
      );
      throw new UnauthorizedException('Token inválido o expirado.');
    }
  }
}
