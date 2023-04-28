import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { BaseEntity, Collector, Location, User } from '../entities';

const logger = new Logger('MikroORM');
const config = {
  entities: [Collector, Location, User, BaseEntity],
  database: 'nestjs',
  type: 'postgresql',
  user: 'admin',
  password: 'admin',
  port: 5432,
  synchronize: true,
  debug: true,
};

export default config;

/*

    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,

*/