import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const baseUrl = process.env.BASE_URL || 'http://localhost:8080';
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>SicVanCreAgr Credit Conditions API</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 2em; }
          .container { max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 2em; }
          h1 { color: #2c3e50; }
          a { color: #007bff; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to SicVanCreAgr Credit Conditions API</h1>
          <p>This API provides credit condition services for SicVanCreAgr.</p>
          <p>
            <strong>Swagger documentation:</strong>
            <a href="${baseUrl}/api" target="_blank">${baseUrl}/api</a>
          </p>
        </div>
      </body>
      </html>
    `;
  }
}
