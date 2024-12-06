import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.use(
    cors({
      origin: 'http://localhost:5173', // Allow requests from this origin
    }),
  );

  await app.listen(3001);
}
bootstrap();
