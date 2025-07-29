import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hashtag } from '../hashtag/hashtag.entity';
import { User } from '../user/user.entity';

@Entity('tweets')
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 280 })
  content: string;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.tweets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Hashtag)
  @JoinTable({
    name: 'tweet_hashtags',
    joinColumn: { name: 'tweet_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'hashtag_id', referencedColumnName: 'id' },
  })
  hashtags?: Hashtag[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
