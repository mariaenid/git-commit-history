
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Collector, Location, User } from '../entities';
import config from '../config/config.development';


@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    MikroOrmModule.forFeature({
      entities: [Collector, Location, User],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule { }