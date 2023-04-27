import { Entity, OneToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';
import { Location } from './Location';


@Entity()
export class Collector extends BaseEntity {
  @Property()
  name: string;

  @Property()
  details: string;


  @Property()
  location_id: string;

  @OneToOne(() => Location, {
    owner: true,
    orphanRemoval: true,
    cascade: [],
    fieldName: 'location_id',
  })
  current_location: Location;
}