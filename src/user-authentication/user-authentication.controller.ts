import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';

class LoginDto {
  email: string;
  password: string;
}

class SignupDto {
  email: string;
  password: string;
  user_metadata?: any;
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


  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.userAuthenticationService.signup(signupDto.email, signupDto.password, signupDto.user_metadata);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }> {
    return this.userAuthenticationService.refreshToken(body.refreshToken);
  }

  @Post('logout')
  async logout(@Headers('authorization') authHeader: string) {
    const token = this.extractTokenFromHeader(authHeader);
    return this.userAuthenticationService.logout(token);
  }

  @Get('me')
  async getCurrentUser(@Headers('authorization') authHeader: string) {
    const token = this.extractTokenFromHeader(authHeader);
    return this.userAuthenticationService.getUser(token);
  }

  private extractTokenFromHeader(authHeader: string): string {
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }
    
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header');
    }
    
    return token;
  }
}
