import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  first_name?: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  last_name?: string;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender?: 'male' | 'female' | null;

  @Column({ type: 'timestamp', nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'text', nullable: true })
  profile_image?: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
