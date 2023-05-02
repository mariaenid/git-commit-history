import { BaseEntity } from './BaseEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Collector } from './Collector';

@Entity({ name: 'location' })
export class Location extends BaseEntity {
  @Column({ nullable: false })
  current_location: string;


  @OneToOne(() => Collector)
  @JoinColumn()
  collector: Collector;

}