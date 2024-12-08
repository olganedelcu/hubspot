import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as qs from 'qs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async getAccessToken(
    authCode: string,
    redirectUri: string,
    userId: string,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }> {
    const clientSecret = this.configService.get<string>(
      'HUBSPOT_CLIENT_SECRET',
    );
    const clientId = this.configService.get<string>('HUBSPOT_CLIENT_ID');

    try {
      const response = await axios.post(
        'https://api.hubapi.com/oauth/v1/token',
        qs.stringify({
          grant_type: 'authorization_code',
          code: authCode,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token, refresh_token, expires_in } = response.data;

      // Save the access token and refresh token in the database
      await this.userService.saveAccessToken(userId, access_token);
      await this.userService.saveRefreshToken(userId, refresh_token); // Ensure you have a method to save the refresh token

      return { access_token, refresh_token, expires_in };
    } catch (error) {
      console.error(
        'Error retrieving access token:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        'Failed to retrieve access token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
