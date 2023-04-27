import { Entity, Property } from "@mikro-orm/core";

@Entity()
export class Collector {

  @Property({ persist: false }) // Similar to class-transformer's `@Expose()`. Will only exist in memory, and will be serialized.
  id: number;

}
