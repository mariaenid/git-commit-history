import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { UseGuards } from '@nestjs/common';
import { ApiGithubService } from './api-github.service';
import { CommitDetail } from './commit-history.dto';
import { Query, Resolver } from '@nestjs/graphql';


@UseGuards(JwtAuthGuard)
@Resolver()
export class ApiGithubResolver {


  constructor(private commitHistoryService: ApiGithubService) { }

  @Query(() => [CommitDetail])
  async getCommits(): Promise<CommitDetail[]> {
    const commits = await this.commitHistoryService.getListCommits() as unknown as CommitDetail[];

    return commits;
  }

}
