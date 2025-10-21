import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { UserAuthenticationController } from './user-authentication/user-authentication.controller';
import { UserAuthenticationService as UserAuthenticationService } from './user-authentication/user-authentication.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserAuthenticationModule,
  ],
  controllers: [AppController, UserAuthenticationController],
  providers: [AppService, UserAuthenticationService],
})
export class AppModule {}
