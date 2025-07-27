import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  first_name: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  last_name: string;

  @Column({ type: 'varchar', nullable: false, length: 100, unique: true })
  email: string;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  gender: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
