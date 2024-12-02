import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export class AuthService {
  async getAccessToken(authCode: string): Promise<string> {
    const tokenUrl = 'https://api.hubapi.com/oauth/v1/token';
    const params = qs.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.HUBSPOT_CLIENT_ID,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: authCode,
    });

    try {
      const response = await axios.post(tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data.access_token; // Return the access token
    } catch (error) {
      console.error('Error getting access token:', error.response.data);
      throw error;
    }
  }
}
