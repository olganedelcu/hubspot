import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column()
  hubspotId: string; // Store HubSpot user ID if needed
}
