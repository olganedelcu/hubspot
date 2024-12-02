import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Step 1: Redirect User to HubSpot for Authorization
  @Get('hubspot')
  redirectToHubSpot(@Res() res: Response) {
    const clientId = process.env.HUBSPOT_CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;

    if (!clientId || !redirectUri) {
      return res.status(500).send('Missing environment variables');
    }

    const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=crm.objects.contacts.read`;
    res.redirect(authUrl);
  }

  // Step 2: Handle Callback from HubSpot
  @Get('callback')
  async handleCallback(@Query('code') authCode: string, @Res() res: Response) {
    try {
      // Attempt to retrieve the access token using the provided authorization code
      const accessToken = await this.authService.getAccessToken(authCode);
      console.log('Access Token:', accessToken);

      // Redirect to frontend application with the access token
      res.redirect(
        `http://localhost:3001/auth/hubspot?access_token=${accessToken}`,
      );
    } catch (error) {
      console.error('Error retrieving access token:', error);
      res.status(500).send('Error retrieving access token');
    }
  }
}
