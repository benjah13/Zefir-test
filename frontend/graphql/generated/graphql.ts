import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};






export type Mutation = {
  __typename?: 'Mutation';
  /** create a new user */
  saveUser: OperationResult;
};


export type MutationSaveUserArgs = {
  input: SaveUserInput;
};

export type OperationResult = {
  __typename?: 'OperationResult';
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  /** get all the users */
  users: Array<UserType>;
};

export type SaveUserInput = {
  /** user email */
  email: Scalars['String'];
};

export type UserType = {
  __typename?: 'UserType';
  /** user UUID */
  id: Scalars['String'];
  /** user email */
  email: Scalars['String'];
  /** User fibonacci value */
  fib: Scalars['Float'];
  /** User associated anagrams */
  anagrams: Scalars['String'];
};

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type GetAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'id' | 'email' | 'fib' | 'anagrams'>
  )> }
);

export type SaveUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SaveUserMutation = (
  { __typename?: 'Mutation' }
  & { saveUser: (
    { __typename?: 'OperationResult' }
    & Pick<OperationResult, 'success'>
  ) }
);


export const GetAllDocument = gql`
    query getAll {
  users {
    id
    email
    fib
    anagrams
  }
}
    `;

/**
 * __useGetAllQuery__
 *
 * To run a query within a React component, call `useGetAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllQuery(baseOptions?: Apollo.QueryHookOptions<GetAllQuery, GetAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllQuery, GetAllQueryVariables>(GetAllDocument, options);
      }
export function useGetAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllQuery, GetAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllQuery, GetAllQueryVariables>(GetAllDocument, options);
        }
export type GetAllQueryHookResult = ReturnType<typeof useGetAllQuery>;
export type GetAllLazyQueryHookResult = ReturnType<typeof useGetAllLazyQuery>;
export type GetAllQueryResult = Apollo.QueryResult<GetAllQuery, GetAllQueryVariables>;
export const SaveUserDocument = gql`
    mutation saveUser($email: String!) {
  saveUser(input: {email: $email}) {
    success
  }
}
    `;
export type SaveUserMutationFn = Apollo.MutationFunction<SaveUserMutation, SaveUserMutationVariables>;

/**
 * __useSaveUserMutation__
 *
 * To run a mutation, you first call `useSaveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserMutation, { data, loading, error }] = useSaveUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSaveUserMutation(baseOptions?: Apollo.MutationHookOptions<SaveUserMutation, SaveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveUserMutation, SaveUserMutationVariables>(SaveUserDocument, options);
      }
export type SaveUserMutationHookResult = ReturnType<typeof useSaveUserMutation>;
export type SaveUserMutationResult = Apollo.MutationResult<SaveUserMutation>;
export type SaveUserMutationOptions = Apollo.BaseMutationOptions<SaveUserMutation, SaveUserMutationVariables>;