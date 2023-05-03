export interface ICommitDetail {
  sha: string;
  url: string;
  commit: {
    name: string;
    email: string;
    date: string;
    description: string;
  }

}