import { BaseEntity, Collector, Location, User } from '../entities';

const config = {
  entities: [Collector, Location, User, BaseEntity],
  database: process.env.NAME_DATABASE,
  type: 'postgresql',
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  port: process.env.PORT_DATABASE,
  synchronize: true,
  debug: true,
};

export default config;