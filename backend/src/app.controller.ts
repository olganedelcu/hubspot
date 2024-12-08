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
        {
          method: 'GET',
          path: '/auth/client-secret',
          description: 'Retrieve the client secret',
        },
      ],
    });
  }

  @Get('auth/client-secret')
  getClientSecret(@Res() res: Response) {
    const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;
    if (!clientSecret) {
      return res.status(404).json({ message: 'Client secret not found' });
    }
    return res.json({ clientSecret });
  }
}
