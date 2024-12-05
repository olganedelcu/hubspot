import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot(@Res() res: Response) {
    res.json({
      message: 'Welcome to the API!',
      status: 'API is running',
      availableRoutes: [
        {
          method: 'GET',
          path: '/auth/hubspot',
          description: 'Redirect to HubSpot for authorization',
        },
        {
          method: 'GET',
          path: '/auth/callback',
          description: 'Handle HubSpot callback',
        },
      ],
    });
  }
}
