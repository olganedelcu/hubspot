import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Step 1: Redirect User to HubSpot for Authorization
  @Post('hubspot') // Change to POST
  redirectToHubSpot(
    @Body()
    body: { client_id: string; client_secret: string; redirect_uri: string },
    @Res() res: Response,
  ) {
    const { client_id, redirect_uri } = body;

    if (!client_id || !redirect_uri) {
      return res.status(500).send('Missing required parameters');
    }

    const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=crm.objects.contacts.read`;
    res.redirect(authUrl);
  }

  // Step 2: Handle Callback from HubSpot
  @Get('callback')
  async handleCallback(@Query('code') authCode: string, @Res() res: Response) {
    try {
      const accessToken = await this.authService.getAccessToken(authCode);
      console.log('Access Token:', accessToken);
      res.redirect(
        `http://localhost:3001/hubspot/callback?access_token=${accessToken}`,
      );
    } catch (error) {
      console.error('Error retrieving access token:', error);
      res.status(500).send('Error retrieving access token');
    }
  }

  @Get('hubspot') // Define the GET route for /auth/hubspot
  getHubSpotAuthUrl(): string {
    return this.authService.getHubSpotAuthUrl(); // Call the service method
  }
}
