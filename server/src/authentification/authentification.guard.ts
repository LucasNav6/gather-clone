import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class AuthentificationGuard implements CanActivate {
  private readonly logger = new Logger(AuthentificationGuard.name);

  constructor(
    private readonly authentificationService: AuthentificationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Tomar el token del header Authorization
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      this.logger.warn('Falta header Authorization');
      throw new UnauthorizedException('Falta token de autorización');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      this.logger.warn(`Formato de token inválido: ${authHeader}`);
      throw new UnauthorizedException('Formato de token inválido');
    }

    // Validar token con el servicio
    const user = await this.authentificationService.validateJwt(token);

    // Inyectar el usuario en la request para el controlador
    request.user = user;

    return true;
  }
}
