import { Module } from '@nestjs/common';
import { UserAuthenticationService } from './user-authentication.service';
import { UserAuthenticationController } from './user-authentication.controller';

@Module({
  providers: [UserAuthenticationService],
  controllers: [UserAuthenticationController]
})
export class UserAuthenticationModule {}
