import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authentification } from './entities/authentification.entity';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthentificationGuard } from './authentification.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authentification]),
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
  exports: [
    AuthentificationService
  ]
})
export class AuthentificationModule {}
