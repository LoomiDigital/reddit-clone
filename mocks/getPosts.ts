import { MockedResponse } from "@apollo/client/testing";
import {
  GetPostsDocument,
  GetPostsQuery,
  PostConnection,
} from "@d20/generated/graphql";

export const mockPostsResponse: MockedResponse = {
  request: {
    query: GetPostsDocument,
    variables: {
      first: 10,
    },
  },
  result: {
    data: {
      posts: {
        __typename: "PostConnection",
        edges: [
          {
            __typename: "PostEdge",
            cursor: "YXJyYXljb25uZWN0aW9uOjA=",
            node: {
              __typename: "Post",
              id: 1,
              title: "Test Post",
              body: "Test Content",
              image: "http://placehold.it/300x300",
              username: "Buck",
              votes: [
                {
                  __typename: "Vote",
                  upvote: true,
                  username: "Buck",
                  post_id: 1,
                },
              ],
              subreddit_id: 1,
              subreddit_topic: "test",
              created_at: "2021-08-15T20:00:00.000Z",
            },
          },
          {
            __typename: "PostEdge",
            cursor: "YXJyYXljb25uZWN0aW9uOjA=",
            node: {
              __typename: "Post",
              id: 2,
              title: "Test Post",
              body: "Test Content",
              username: "Buck",
              image: "http://placehold.it/300x300",
              votes: [
                {
                  __typename: "Vote",
                  upvote: true,
                  username: "Buck",
                  post_id: 2,
                },
              ],
              subreddit_id: 2,
              subreddit_topic: "test",
              created_at: "2021-08-15T20:00:00.000Z",
            },
          },
        ],
        pageInfo: {
          __typename: "PageInfo",
          hasNextPage: false,
          endCursor: "YXJyYXljb25uZWN0aW9uOjA=",
        },
      },
    },
  },
};

export const mockPosts: GetPostsQuery = {
  posts: {
    __typename: "PostConnection",
    edges: [
      {
        __typename: "PostEdge",
        cursor: "YXJyYXljb25uZWN0aW9uOjA=",
        node: {
          __typename: "Post",
          id: 1,
          title: "Test Post",
          body: "Test Content",
          image: "http://placehold.it/300x300",
          username: "Buck",
          votes: [
            {
              __typename: "Vote",
              upvote: true,
              username: "Buck",
              post_id: 1,
            },
          ],
          subreddit_id: 1,
          subreddit_topic: "test",
          created_at: "2021-08-15T20:00:00.000Z",
        },
      },
      {
        __typename: "PostEdge",
        cursor: "YXJyYXljb25uZWN0aW9uOjA=",
        node: {
          __typename: "Post",
          id: 2,
          title: "Test Post",
          body: "Test Content",
          username: "Buck",
          image: "http://placehold.it/300x300",
          votes: [
            {
              __typename: "Vote",
              upvote: true,
              username: "Buck",
              post_id: 2,
            },
          ],
          subreddit_id: 2,
          subreddit_topic: "test",
          created_at: "2021-08-15T20:00:00.000Z",
        },
      },
    ],
    pageInfo: {
      __typename: "PageInfo",
      hasNextPage: false,
      endCursor: "YXJyYXljb25uZWN0aW9uOjA=",
    },
  },
};

export const mockPostConnection: PostConnection = {
  __typename: "PostConnection",
  edges: [
    {
      __typename: "PostEdge",
      cursor: "YXJyYXljb25uZWN0aW9uOjA=",
      node: {
        __typename: "Post",
        id: 1,
        title: "Test Post",
        body: "Test Content",
        image: "http://placehold.it/300x300",
        username: "Buck",
        votes: [
          {
            __typename: "Vote",
            upvote: true,
            username: "Buck",
            post_id: 1,
          },
        ],
        subreddit_id: 1,
        subreddit_topic: "test",
        created_at: "2021-08-15T20:00:00.000Z",
      },
    },
    {
      __typename: "PostEdge",
      cursor: "YXJyYXljb25uZWN0aW9uOjA=",
      node: {
        __typename: "Post",
        id: 2,
        title: "Test Post",
        body: "Test Content",
        username: "Buck",
        image: "http://placehold.it/300x300",
        votes: [
          {
            __typename: "Vote",
            upvote: true,
            username: "Buck",
            post_id: 2,
          },
        ],
        subreddit_id: 2,
        subreddit_topic: "test",
        created_at: "2021-08-15T20:00:00.000Z",
      },
    },
  ],
  pageInfo: {
    __typename: "PageInfo",
    hasPreviousPage: false,
    hasNextPage: false,
    startCursor: "YXJyYXljb25uZWN0aW9uOjA=",
    endCursor: "YXJyYXljb25uZWN0aW9uOjA=",
  },
};

export const mockUseGetLazyPostsReturn = {
  posts: mockPosts.posts?.edges,
  loading: false,
  hasNextPage: true,
  sentryRef: jest.fn(),
};
