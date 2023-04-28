import { Injectable, Type } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Repository } from "typeorm";

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {

  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    service: any;

    @Query((type) => [classRef], { name: `findOne${classRef.name}` })
    //@UseGuards(JwtAuthGuard)
    async findOne(
      @Args('arg') arg?: string,
    ): Promise<T> {
      const query = JSON.parse(arg);

      return this.service.findOne(query);
    }

    @Query((type) => [classRef], { name: `findAll${classRef.name}` })
    //@UseGuards(JwtAuthGuard)
    async findAll(): Promise<T[]> {
      return this.service.findAll()
    }


  }
  return BaseResolverHost;
}

export function BaseService<T extends Type<unknown>>(classRef: T): any {
  @Injectable()
  abstract class BaseServiceHost {
    repository: Repository<T>;

    async findOne(arg: T): Promise<T> {

      return this.repository.find({
        where: arg as any,
      }) as any;
    }

    async findAll(): Promise<T[]> {
      return this.repository.find()
    }
  }
  return BaseServiceHost;
}