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
  DateTime: any;
};

/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type Mutation = {
  __typename?: 'Mutation';
  addVote?: Maybe<Vote>;
  /**  Mutations for type 'comment'  */
  deleteComment?: Maybe<Comment>;
  /**  Mutations for type 'post'  */
  deletePost?: Maybe<Post>;
  /**  Mutations for type 'subreddit'  */
  deleteSubreddit?: Maybe<Subreddit>;
  /**  Mutations for type 'vote'  */
  deleteVote?: Maybe<Vote>;
  insertComment?: Maybe<Comment>;
  insertPost?: Maybe<Post>;
  insertSubreddit?: Maybe<Subreddit>;
  insertVote?: Maybe<Vote>;
  updateComment?: Maybe<Comment>;
  updatePost?: Maybe<Post>;
  updateSubreddit?: Maybe<Subreddit>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationAddVoteArgs = {
  post_id?: InputMaybe<Scalars['ID']>;
  upvote?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteSubredditArgs = {
  id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteVoteArgs = {
  id: Scalars['ID'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertCommentArgs = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  post_id?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertPostArgs = {
  body?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  subreddit_id?: InputMaybe<Scalars['ID']>;
  subreddit_topic: Scalars['String'];
  title: Scalars['String'];
  username: Scalars['String'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertSubredditArgs = {
  topic?: InputMaybe<Scalars['String']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertVoteArgs = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  post_id?: InputMaybe<Scalars['ID']>;
  upvote?: InputMaybe<Scalars['Boolean']>;
  username?: InputMaybe<Scalars['String']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateCommentArgs = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  post_id?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdatePostArgs = {
  body?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: InputMaybe<Scalars['String']>;
  subreddit_id?: InputMaybe<Scalars['ID']>;
  subreddit_topic?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateSubredditArgs = {
  created_at?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  topic?: InputMaybe<Scalars['String']>;
};

/**
 * PageInfo indicates if more results are available in a connection.
 * See *GraphQL Cursor Connections Specification*
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Cursor corresponding to the last node in edges */
  endCursor: Scalars['String'];
  /** Indicates whether more edges exist following the set defined by the pagination arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more edges exist prior to the set defined by the pagination arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** Cursor corresponding to the first node in edges */
  startCursor: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  subreddit_id?: Maybe<Scalars['ID']>;
  subreddit_topic?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  votes?: Maybe<Array<Maybe<Vote>>>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  pageInfo: PageInfo;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Post>;
};

/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type Query = {
  __typename?: 'Query';
  comment?: Maybe<Comment>;
  commentList?: Maybe<Array<Maybe<Comment>>>;
  commentPaginatedList?: Maybe<Array<Maybe<Comment>>>;
  /**  Queries for type 'post'  */
  getPost?: Maybe<Array<Maybe<Post>>>;
  getPostById?: Maybe<Post>;
  getPostList?: Maybe<Array<Maybe<Post>>>;
  getPostsByTopic?: Maybe<Array<Maybe<Post>>>;
  /**  Queries for type 'subreddit'  */
  getSubreddit?: Maybe<Subreddit>;
  getSubredditByTopic?: Maybe<Subreddit>;
  /**  Queries for type 'vote'  */
  getVotesByPostId?: Maybe<Array<Maybe<Vote>>>;
  /**  Queries for type 'comment'  */
  posts?: Maybe<PostConnection>;
  postsByTopic?: Maybe<PostConnection>;
  subreddit?: Maybe<Subreddit>;
  subredditList?: Maybe<Array<Maybe<Subreddit>>>;
  subredditPaginatedList?: Maybe<Array<Maybe<Subreddit>>>;
  voteList?: Maybe<Array<Maybe<Vote>>>;
  votePaginatedList?: Maybe<Array<Maybe<Vote>>>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentArgs = {
  id: Scalars['ID'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetPostArgs = {
  id: Scalars['ID'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetPostByIdArgs = {
  id: Scalars['ID'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetPostsByTopicArgs = {
  topic: Scalars['String'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetSubredditArgs = {
  subreddit_id: Scalars['ID'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetSubredditByTopicArgs = {
  topic: Scalars['String'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetVotesByPostIdArgs = {
  post_id: Scalars['ID'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPostsByTopicArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  topic?: InputMaybe<Scalars['String']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QuerySubredditArgs = {
  id: Scalars['ID'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QuerySubredditPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryVotePaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Comment = {
  __typename?: 'comment';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  post_id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Subreddit = {
  __typename?: 'subreddit';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  topic?: Maybe<Scalars['String']>;
};

export type Vote = {
  __typename?: 'vote';
  created_at?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  post_id?: Maybe<Scalars['ID']>;
  upvote?: Maybe<Scalars['Boolean']>;
  username?: Maybe<Scalars['String']>;
};

export type PostAttributesFragment = { __typename?: 'Post', id?: string | null, title?: string | null, body?: string | null, image?: string | null, username?: string | null, subreddit_id?: string | null, subreddit_topic?: string | null, created_at?: any | null, votes?: Array<{ __typename?: 'vote', id?: string | null, upvote?: boolean | null, username?: string | null } | null> | null };

export type AddPostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  image: Scalars['String'];
  username: Scalars['String'];
  subreddit_id: Scalars['ID'];
  subreddit_topic: Scalars['String'];
}>;


export type AddPostMutation = { __typename?: 'Mutation', insertPost?: { __typename?: 'Post', id?: string | null, title?: string | null, body?: string | null, image?: string | null, username?: string | null, subreddit_id?: string | null, subreddit_topic?: string | null, created_at?: any | null, votes?: Array<{ __typename?: 'vote', id?: string | null, upvote?: boolean | null, username?: string | null } | null> | null } | null };

export type GetPostByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPostByIdQuery = { __typename?: 'Query', getPostById?: { __typename?: 'Post', id?: string | null, title?: string | null, body?: string | null, image?: string | null, username?: string | null, subreddit_id?: string | null, subreddit_topic?: string | null, created_at?: any | null, votes?: Array<{ __typename?: 'vote', id?: string | null, upvote?: boolean | null, username?: string | null } | null> | null } | null };

export type GetPostsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', edges?: Array<{ __typename?: 'PostEdge', cursor?: string | null, node?: { __typename?: 'Post', id?: string | null, title?: string | null, body?: string | null, image?: string | null, username?: string | null, subreddit_id?: string | null, subreddit_topic?: string | null, created_at?: any | null, votes?: Array<{ __typename?: 'vote', id?: string | null, upvote?: boolean | null, username?: string | null } | null> | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string } } | null };

export type GetPostsByTopicQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  topic: Scalars['String'];
}>;


export type GetPostsByTopicQuery = { __typename?: 'Query', postsByTopic?: { __typename?: 'PostConnection', edges?: Array<{ __typename?: 'PostEdge', cursor?: string | null, node?: { __typename?: 'Post', id?: string | null, title?: string | null, body?: string | null, image?: string | null, username?: string | null, subreddit_id?: string | null, subreddit_topic?: string | null, created_at?: any | null, votes?: Array<{ __typename?: 'vote', id?: string | null, upvote?: boolean | null, username?: string | null } | null> | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string } } | null };

export type GetSubredditByTopicQueryVariables = Exact<{
  topic: Scalars['String'];
}>;


export type GetSubredditByTopicQuery = { __typename?: 'Query', getSubredditByTopic?: { __typename?: 'subreddit', id?: string | null, topic?: string | null } | null };

export const PostAttributesFragmentDoc = gql`
    fragment postAttributes on Post {
  id
  title
  body
  image
  username
  votes {
    id
    upvote
    username
  }
  subreddit_id
  subreddit_topic
  created_at
}
    `;
export const AddPostDocument = gql`
    mutation AddPost($title: String!, $body: String!, $image: String!, $username: String!, $subreddit_id: ID!, $subreddit_topic: String!) {
  insertPost(
    title: $title
    body: $body
    image: $image
    username: $username
    subreddit_id: $subreddit_id
    subreddit_topic: $subreddit_topic
  ) {
    ...postAttributes
  }
}
    ${PostAttributesFragmentDoc}`;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      image: // value for 'image'
 *      username: // value for 'username'
 *      subreddit_id: // value for 'subreddit_id'
 *      subreddit_topic: // value for 'subreddit_topic'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const GetPostByIdDocument = gql`
    query GetPostById($id: ID!) {
  getPostById(id: $id) {
    ...postAttributes
  }
}
    ${PostAttributesFragmentDoc}`;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, options);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    edges {
      node {
        ...postAttributes
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${PostAttributesFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostsByTopicDocument = gql`
    query GetPostsByTopic($first: Int, $after: String, $topic: String!) {
  postsByTopic(first: $first, after: $after, topic: $topic) {
    edges {
      node {
        ...postAttributes
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${PostAttributesFragmentDoc}`;

/**
 * __useGetPostsByTopicQuery__
 *
 * To run a query within a React component, call `useGetPostsByTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByTopicQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useGetPostsByTopicQuery(baseOptions: Apollo.QueryHookOptions<GetPostsByTopicQuery, GetPostsByTopicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsByTopicQuery, GetPostsByTopicQueryVariables>(GetPostsByTopicDocument, options);
      }
export function useGetPostsByTopicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByTopicQuery, GetPostsByTopicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsByTopicQuery, GetPostsByTopicQueryVariables>(GetPostsByTopicDocument, options);
        }
export type GetPostsByTopicQueryHookResult = ReturnType<typeof useGetPostsByTopicQuery>;
export type GetPostsByTopicLazyQueryHookResult = ReturnType<typeof useGetPostsByTopicLazyQuery>;
export type GetPostsByTopicQueryResult = Apollo.QueryResult<GetPostsByTopicQuery, GetPostsByTopicQueryVariables>;
export const GetSubredditByTopicDocument = gql`
    query GetSubredditByTopic($topic: String!) {
  getSubredditByTopic(topic: $topic) {
    id
    topic
  }
}
    `;

/**
 * __useGetSubredditByTopicQuery__
 *
 * To run a query within a React component, call `useGetSubredditByTopicQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubredditByTopicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubredditByTopicQuery({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useGetSubredditByTopicQuery(baseOptions: Apollo.QueryHookOptions<GetSubredditByTopicQuery, GetSubredditByTopicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubredditByTopicQuery, GetSubredditByTopicQueryVariables>(GetSubredditByTopicDocument, options);
      }
export function useGetSubredditByTopicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubredditByTopicQuery, GetSubredditByTopicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubredditByTopicQuery, GetSubredditByTopicQueryVariables>(GetSubredditByTopicDocument, options);
        }
export type GetSubredditByTopicQueryHookResult = ReturnType<typeof useGetSubredditByTopicQuery>;
export type GetSubredditByTopicLazyQueryHookResult = ReturnType<typeof useGetSubredditByTopicLazyQuery>;
export type GetSubredditByTopicQueryResult = Apollo.QueryResult<GetSubredditByTopicQuery, GetSubredditByTopicQueryVariables>;