import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import axios from 'axios'; // Import axios for making HTTP requests

const stateStore: { [key: string]: boolean } = {};

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Post('hubspot')
  async redirectToHubSpot(
    @Body() body: { scopes: string; accountId?: string },
    @Res() res: Response,
  ) {
    const { scopes, accountId } = body;
    const client_id = this.configService.get<string>('hubspotClientId');
    const redirect_uri = 'http://localhost:5173/hubspot/callback';

    console.log('Client ID:', client_id);
    console.log('Redirect URI:', redirect_uri);
    console.log('Scopes:', scopes);

    if (!client_id || !redirect_uri || !scopes) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const state = Math.random().toString(36).substring(2);
    stateStore[state] = true; // Store the state

    const accountPath = accountId ? `${accountId}/` : '';
    const authUrl = `https://app.hubspot.com/oauth/${accountPath}authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}&state=${state}`;

    console.log('Auth URL:', authUrl);

    return res.json({ authUrl });
  }

  @Post('hubspot/token')
  async exchangeCodeForToken(
    @Body() body: { code: string },
    @Res() res: Response,
  ) {
    const { code } = body;
    const client_id = this.configService.get<string>('hubspotClientId');
    const client_secret = this.configService.get<string>('hubspotClientSecret');
    const redirect_uri = 'http://localhost:5173/hubspot/callback';

    if (!code || !client_id || !client_secret || !redirect_uri) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
      const response = await axios.post(
        'https://api.hubapi.com/oauth/v1/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id,
            client_secret,
            redirect_uri,
            code,
          },
        },
      );

      return res.json(response.data);
    } catch (error) {
      console.error('Error fetching access token:', error.response.data);
      return res
        .status(500)
        .json({
          message: 'Failed to fetch access token',
          error: error.response.data,
        });
    }
  }
}
