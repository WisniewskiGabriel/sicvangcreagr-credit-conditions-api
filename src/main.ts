import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT ?? 8080}`;

  // Enable CORS with dynamic origin handling
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://sicvangcreagr-credit-conditions-sim.vercel.app',
      ];

      // Allow localhost origins in development
      if (process.env.NODE_ENV === 'development') {
        allowedOrigins.push('http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000');
      }

      // Check for Vercel preview deployments (wildcard pattern)
      const vercelPattern = /^https:\/\/sicvangcreagr-credit-conditions-simulator-.+\.vercel\.app$/;
      
      // Allow if origin matches any allowed origin or Vercel pattern
      if (!origin || allowedOrigins.includes(origin) || vercelPattern.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Enable global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Credit Conditions API')
    .setDescription('NestJS API for managing credit conditions with user authentication')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8080);
  console.log(`Application is running on: ${baseUrl}`);
  console.log(`Swagger documentation available at: ${baseUrl}/api`);
}
void bootstrap();
