import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OrmModule } from './orm/orm.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiGithubModule } from './api-github/api-github.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './packages/api/src/graphql/schema.gql',
      sortSchema: true,
      playground: true
    }),
    OrmModule,
    UsersModule,
    AuthModule,
    ApiGithubModule
  ],
  //providers: [
  // {
  //provide: APP_GUARD,
  //useClass: JwtAuthGuard,
  //},
  // ]
})
export class AppModule { }

