import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Profile } from '../profile/profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false, length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
