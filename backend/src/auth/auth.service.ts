import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  getHubSpotAuthUrl(): string {
    const clientId = this.configService.get<string>('HUBSPOT_CLIENT_ID');
    const redirectUri = this.configService.get<string>('REDIRECT_URI');
    const scope = this.configService.get<string>('SCOPE');
    const state = 'null'; 

    return `https://app.hubspot.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
  }

  async getAccessToken(authCode: string): Promise<string> {
    const clientSecret = this.configService.get<string>(
      'HUBSPOT_CLIENT_SECRET',
    );

    // Logic to retrieve access token using authCode and clientSecret
    const response = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.configService.get<string>('HUBSPOT_CLIENT_ID'),
        client_secret: clientSecret,
        redirect_uri: this.configService.get<string>('REDIRECT_URI'),
        code: authCode,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve access token');
    }

    const data = await response.json();
    return data.access_token; // Return the access token
  }
}
