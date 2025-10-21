import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { UserAuthenticationService } from './user-authentication.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponseDto, TokenResponseDto, UserResponseDto } from './dto/response.dto';

@ApiTags('User Authentication')
@Controller('user-authentication')
export class UserAuthenticationController {
  constructor(
    private readonly userAuthenticationService: UserAuthenticationService,
  ) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'User login', 
    description: 'Authenticate user with email and password' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful', 
    type: AuthResponseDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials' 
  })
  async login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    return this.userAuthenticationService.login(body.email, body.password);
  }


  @Post('signup')
  @ApiOperation({ 
    summary: 'User registration', 
    description: 'Create a new user account' 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User created successfully', 
    type: AuthResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - validation errors' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'User already exists' 
  })
  async signup(@Body() signupDto: SignupDto) {
    return this.userAuthenticationService.signup(signupDto.email, signupDto.password, signupDto.user_metadata);
  }

  @Post('refresh-token')
  @ApiOperation({ 
    summary: 'Refresh access token', 
    description: 'Get a new access token using refresh token' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Token refreshed successfully', 
    type: TokenResponseDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid refresh token' 
  })
  async refreshToken(@Body() body: RefreshTokenDto): Promise<TokenResponseDto> {
    return this.userAuthenticationService.refreshToken(body.refreshToken);
  }

  @Post('logout')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'User logout', 
    description: 'Logout user and invalidate token' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Logout successful' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid or missing authorization token' 
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  })
  async logout(@Headers('authorization') authHeader: string) {
    const token = this.extractTokenFromHeader(authHeader);
    return this.userAuthenticationService.logout(token);
  }

  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Get current user', 
    description: 'Get current authenticated user information' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User information retrieved successfully', 
    type: UserResponseDto 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid or missing authorization token' 
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
    required: true,
    schema: {
      type: 'string',
      example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  })
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
