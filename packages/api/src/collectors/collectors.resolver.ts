import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Collector } from './collector.model';


@Resolver(of => Collector)
export class CollectorsResolver {


  @Query(returns => Collector)
  async getCollector(@Args('id', { type: () => Int }) id: number): Promise<Collector> {
    return { id: 1 };
  }

}
