import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { BaseEntity, Collector, Location, User } from '../entities';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: [Collector, Location, User, BaseEntity],
  dbName: 'nestjs',
  type: 'postgresql',
  user: 'admin',
  password: 'admin',
  port: 5432,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
};

export default config;