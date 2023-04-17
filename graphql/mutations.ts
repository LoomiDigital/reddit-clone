import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation AddPost(
    $title: String!
    $body: String!
    $image: String!
    $username: String!
    $subreddit_id: ID!
    $subreddit_topic: String!
  ) {
    insertPost(
      title: $title
      body: $body
      image: $image
      username: $username
      subreddit_id: $subreddit_id
      subreddit_topic: $subreddit_topic
    ) {
      id
      title
      body
      image
      username
      subreddit_id
      created_at
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation AddSubreddit($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;
