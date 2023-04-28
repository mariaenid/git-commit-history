import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  createdAt: Date = new Date();

  @Column()
  updatedAt: Date = new Date();

}

/*
/*

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean
}

*/
