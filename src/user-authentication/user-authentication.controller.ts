import { Controller, Post, Body } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';

class LoginDto {
  email: string;
  password: string;
}

class RefreshTokenDto {
  refreshToken: string;
}

@Controller('user-authentication')
export class UserAuthenticationController {
  constructor(
    private readonly userAuthenticationService: UserAuthenticationService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<{
    user: { id: string; email: string | undefined };
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }> {
    return this.userAuthenticationService.login(body.email, body.password);
  }


  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }> {
    return this.userAuthenticationService.refreshToken(body.refreshToken);
  }
}
