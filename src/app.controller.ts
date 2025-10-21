import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Health check', 
    description: 'Simple health check endpoint' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'API is running',
    schema: {
      type: 'string',
      example: 'Hello World!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('debug')
  @ApiOperation({ 
    summary: 'Debug info', 
    description: 'Get debug information about the environment' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Debug information',
    schema: {
      type: 'object',
      properties: {
        environment: { type: 'string' },
        port: { type: 'string' },
        baseUrl: { type: 'string' },
        timestamp: { type: 'string' }
      }
    }
  })
  getDebugInfo() {
    return {
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || '8080',
      baseUrl: process.env.BASE_URL || 'http://localhost:8080',
      timestamp: new Date().toISOString(),
      swagger: 'enabled'
    };
  }
}
