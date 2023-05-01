import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Collector = {
  __typename?: 'Collector';
  id: Scalars['Int'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  access_token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResult;
  register: LoginResult;
};


export type MutationLoginArgs = {
  password?: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findAllUser: Array<User>;
  findOneUser: Array<User>;
  getCollector: Collector;
  getUserByEmail: User;
};


export type QueryFindOneUserArgs = {
  arg: Scalars['String'];
};


export type QueryGetCollectorArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', access_token: string, user: { __typename?: 'User', id?: string | null, name?: string | null, email?: string | null } } };

export type FindOneUserQueryVariables = Exact<{
  arg: Scalars['String'];
}>;


export type FindOneUserQuery = { __typename?: 'Query', findOneUser: Array<{ __typename?: 'User', name?: string | null, email?: string | null, password?: string | null, lastName?: string | null }> };


export const LoginDocument = gql`
    mutation login($password: String!, $username: String) {
  login(password: $password, username: $username) {
    access_token
    user {
      id
      name
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FindOneUserDocument = gql`
    query findOneUser($arg: String!) {
  findOneUser(arg: $arg) {
    name
    email
    password
    lastName
  }
}
    `;

/**
 * __useFindOneUserQuery__
 *
 * To run a query within a React component, call `useFindOneUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneUserQuery({
 *   variables: {
 *      arg: // value for 'arg'
 *   },
 * });
 */
export function useFindOneUserQuery(baseOptions: Apollo.QueryHookOptions<FindOneUserQuery, FindOneUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneUserQuery, FindOneUserQueryVariables>(FindOneUserDocument, options);
      }
export function useFindOneUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneUserQuery, FindOneUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneUserQuery, FindOneUserQueryVariables>(FindOneUserDocument, options);
        }
export type FindOneUserQueryHookResult = ReturnType<typeof useFindOneUserQuery>;
export type FindOneUserLazyQueryHookResult = ReturnType<typeof useFindOneUserLazyQuery>;
export type FindOneUserQueryResult = Apollo.QueryResult<FindOneUserQuery, FindOneUserQueryVariables>;