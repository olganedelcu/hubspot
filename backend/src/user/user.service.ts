import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveAccessToken(userId: string, accessToken: string): Promise<void> {
    await this.userRepository.update(
      { id: Number(userId) },
      { accessToken: accessToken },
    );
  }

  async getAccessToken(userId: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
    });
    return user?.accessToken;
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userRepository.update(
      { id: Number(userId) },
      { refreshToken: refreshToken },
    );
  }
}
