import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthdate: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: number; //user: 0, admin: 1
}
