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

  @Column({ nullable: true }) // Optional: Store the scopes granted by the user
  scopes: string;

  @Column({ type: 'timestamp', nullable: true }) // Optional: Store the expiration time of the access token
  accessTokenExpiresAt: Date;
}
