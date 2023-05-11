
import { Module } from '@nestjs/common';
import { Collector, Location, User } from '../entities';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOCALHOST_DATABASE,
      port: parseInt(process.env.PORT_DATABASE),
      username: process.env.USER_DATABASE,
      password: process.env.PASSWORD_DATABASE,
      database: process.env.NAME_DATABASE,
      entities: [Collector, Location, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Collector, Location, User]),
  ],
  exports: [TypeOrmModule, OrmModule],
})
export class OrmModule { }