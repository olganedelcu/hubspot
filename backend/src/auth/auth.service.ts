import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@hubspot/api-client';
import axios from 'axios';

@Injectable()
export class AuthService {
  private hubspotClient: Client;

  constructor(private configService: ConfigService) {
    this.hubspotClient = new Client({
      apiKey: this.configService.get<string>('HUBSPOT_API_KEY'),
    });
  }

  async getAccessToken(authCode: string, redirectUri: string): Promise<string> {
    const clientSecret = this.configService.get<string>(
      'HUBSPOT_CLIENT_SECRET',
    );

    try {
      const response = await axios.post(
        'https://api.hubapi.com/oauth/v1/token',
        null,
        {
          params: {
            grant_type: 'authorization_code',
            client_id: this.configService.get<string>('HUBSPOT_CLIENT_ID'),
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: authCode,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data.access_token; // Return the access token
    } catch (error) {
      console.error(
        'Error retrieving access token:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to retrieve access token');
    }
  }

  async fetchContacts(accessToken: string): Promise<any> {
    try {
      const apiResponse =
        await this.hubspotClient.crm.contacts.basicApi.getPage(
          undefined,
          undefined,
          [accessToken],
        );
      return apiResponse.results; // Return the contacts data
    } catch (error) {
      console.error('Error fetching contacts:', error.message);
      throw new Error('Failed to fetch contacts');
    }
  }

  getHubSpotAuthUrl(scopes: string): string {
    // Return the HubSpot authorization URL with dynamic scopes
    const clientId = this.configService.get<string>('HUBSPOT_CLIENT_ID');
    const redirectUri = this.configService.get<string>('REDIRECT_URI'); // You can also set this in your config
    return `https://app.hubspot.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  }
}
