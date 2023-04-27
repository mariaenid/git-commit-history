import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CollectorsModule } from './collectors/collectors.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrmModule } from './orm/orm.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './graphql/schema.gql',
      sortSchema: true,
      playground: true
    }),
    // TypeOrmModule.forRoot(),
    OrmModule,
    CollectorsModule,
    AuthModule,
  ],
  //providers: [
  // {
  //provide: APP_GUARD,
  //useClass: JwtAuthGuard,
  //},
  // ]
})
export class AppModule { }

