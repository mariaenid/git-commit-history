import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CollectorsModule } from './collectors/collectors.module';
import { OrmModule } from './orm/orm.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './packages/api/src/graphql/schema.gql',
      sortSchema: true,
      playground: true
    }),
    OrmModule,
    CollectorsModule,
    UsersModule,
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

