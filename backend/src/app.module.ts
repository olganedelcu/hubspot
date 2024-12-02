import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
      validationSchema: Joi.object({
        HUBSPOT_CLIENT_ID: Joi.string().required(),
        HUBSPOT_CLIENT_SECRET: Joi.string().required(),
        REDIRECT_URI: Joi.string().uri().required(),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
