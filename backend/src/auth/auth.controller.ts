import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Step 1: Redirect User to HubSpot for Authorization
  @Get('hubspot')
  redirectToHubSpot(@Res() res: Response) {
    const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.HUBSPOT_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&scope=crm.objects.contacts.read`;
    res.redirect(authUrl);
  }

  // Step 2: Handle Callback from HubSpot
  @Get('callback')
  async handleCallback(@Query('code') authCode: string, @Res() res: Response) {
    try {
      // Attempt to retrieve the access token using authorization code
      const accessToken = await this.authService.getAccessToken(authCode);
      console.log('our·code', accessToken);
      // Redirect to frontend application with the access token
      res.redirect(
        `http://localhost:3001/auth/hubspot?access_token=${accessToken}`,
      ); // Updated URL
    } catch (error) {
      console.error('Error retrieving access token:', error);
      res.status(500).send('Error retrieving access token');
    }
  }
}
