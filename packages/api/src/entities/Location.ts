import { Cascade, Entity, ForeignKeyConstraintViolationException, IdentifiedReference, OneToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';
import { Collector } from './Collector';

@Entity()
export class Location extends BaseEntity {

  @Property({})
  collector_id: string;


  @Property()
  current_location: string;


  @OneToOne(() => Collector, {
    owner: true,
    orphanRemoval: true,
    cascade: [],
    fieldName: 'collector_id',
  })
  collector: Collector;

}