import { Controller, Post, Body, Res, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

const stateStore: { [key: string]: boolean } = {};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('hubspot')
  redirectToHubSpot(
    @Body()
    body: {
      client_id: string;
      client_secret: string;
      redirect_uri: string;
      scopes: string;
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
    res.redirect(authUrl);
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
}
