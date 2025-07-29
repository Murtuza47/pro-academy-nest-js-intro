import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('hashtags')
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;
}
