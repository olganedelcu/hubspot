import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // This specifies the name of the table in the database
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Auto-incrementing primary key

  @Column({ unique: true })
  username: string; // Unique username for the user

  @Column({ nullable: true })
  hubspot_access_token: string; // Store the HubSpot access token

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; // Timestamp for when the user was created

  @Column({ nullable: true })
  accessToken: string; // token

  @Column({ nullable: true })
  refreshToken: string; // Add this line if it doesn't exist
}
