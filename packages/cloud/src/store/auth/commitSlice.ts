import { createSlice } from "@reduxjs/toolkit";


interface ICommit {
  sha: string;
  url: string;
  author: string;
  email: string;
  description: string;
  date: Date;
}
interface ICommitStore {
  name: 'commit';
  commits: ICommit[];
  errorMessage: any;
}
export const commitSlice = createSlice({
  name: 'commit',
  initialState: {
    commits: [],
    errorMessage: undefined
  },
  reducers: {
    onLoadCommits: (state, { payload }) => {
      state.commits = payload.data
      state.errorMessage = undefined;
    },
    onLoadError: (state, { payload }) => {
      state.commits = []
      state.errorMessage = payload;
    },
    cleanErrorMessage: (state) => {
      state.errorMessage = undefined;
      state.commits = []
    },
  }
});

export const { onLoadCommits, onLoadError, cleanErrorMessage } = commitSlice.actions