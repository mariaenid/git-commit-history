import { Module } from '@nestjs/common';
import { ApiGithubResolver } from './api-github.resolver';
import { ApiGithubService } from './api-github.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ApiGithubResolver, ApiGithubService]
})
export class ApiGithubModule { }
