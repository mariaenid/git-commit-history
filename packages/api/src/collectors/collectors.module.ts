import { Module } from '@nestjs/common';
import { CollectorsResolver } from './collectors.resolver';

@Module({
  providers: [CollectorsResolver]
})
export class CollectorsModule {}
