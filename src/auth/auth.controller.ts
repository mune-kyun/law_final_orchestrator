import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtDTO, LoginDto } from './dto';
import { CustomJwt } from './decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@CustomJwt(JwtDTO) jwt: any, @Body() dto: LoginDto): string {
    return this.authService.login(jwt, dto);
  }
}
