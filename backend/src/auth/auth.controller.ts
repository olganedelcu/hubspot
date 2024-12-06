import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

const stateStore: { [key: string]: boolean } = {};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('hubspot')
  async redirectToHubSpot(
    @Body()
    body: {
      client_id: string; // User-provided client ID
      redirect_uri: string; // User-provided redirect URI
      scopes: string; // User-provided scopes
    },
    @Res() res: Response,
  ) {
    const { client_id, redirect_uri, scopes } = body;

    if (!client_id || !redirect_uri || !scopes) {
      return res.status(400).send('Missing required parameters');
    }

    const state = Math.random().toString(36).substring(2);
    stateStore[state] = true; // Store the state

    const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}&state=${state}`;

    // Return the URL as JSON
    return res.json({ authUrl });
  }

  @Get('callback')
  async handleCallback(
    @Query('code') authCode: string,
    @Query('redirect_uri') redirectUri: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    if (!stateStore[state]) {
      return res.status(403).send('Invalid state parameter');
    }

    try {
      const accessToken = await this.authService.getAccessToken(
        authCode,
        redirectUri,
      );
      console.log('Access Token:', accessToken);
      res.redirect(
        `http://localhost:5173/hubspot/callback?access_token=${accessToken}`,
      );
    } catch (error) {
      console.error('Error retrieving access token:', error);
      res.status(500).send('Error retrieving access token');
    } finally {
      delete stateStore[state];
    }
  }

  // New endpoint to serve the HTML link
  @Get('install')
  getInstallLink(
    @Query('client_id') clientId: string,
    @Query('redirect_uri') redirectUri: string,
    @Query('scopes') scopes: string,
    @Res() res: Response,
  ) {
    if (!clientId || !redirectUri || !scopes) {
      return res.status(400).send('Missing required query parameters');
    }

    const state = Math.random().toString(36).substring(2); // Generate a new state
    stateStore[state] = true; // Store the state

    // Construct the authorization URL
    const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=${state}`;

    // Serve the HTML link
    res.send(`
      <html>
        <body>
          <h1>Install HubSpot Integration</h1>
          <a href="${authUrl}">Install</a>
        </body>
      </html>
    `);
  }
}
