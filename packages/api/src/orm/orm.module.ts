
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Collector, Location, User } from '../entities';
import config from '../config/config.development';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'nestjs',
      entities: [Collector, Location, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Collector, Location, User]),
  ],
  exports: [TypeOrmModule, OrmModule],
})
export class OrmModule { }