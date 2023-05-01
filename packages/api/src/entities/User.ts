
import { BaseEntity } from './BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;
}

/*
@Entity({name: 'users'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  nickname!: string;
}
*/