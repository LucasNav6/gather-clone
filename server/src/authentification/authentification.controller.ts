import { Controller, Get, Query } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';

@Controller('authentification')
export class AuthentificationController {
  constructor(private readonly authService: AuthentificationService) {}

  @Get('google-provider/get-url')
  getGoogleUrl() {
    return { url: this.authService.getGoogleAuthUrl() };
  }

  @Get('google-provider/get-jwt')
  async googleCallback(@Query('code') code: string) {
    return await this.authService.validateGoogleUser(code);
  }
}
