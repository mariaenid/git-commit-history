
import { BaseEntity } from './BaseEntity';
import { Location } from './Location';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';


@Entity({ name: 'collector' })
export class Collector extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  details: string;


  @OneToOne(() => Location)
  @JoinColumn()
  current_location: Location;
}

