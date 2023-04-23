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
      subreddit_topic
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

export const ADD_VOTE = gql`
  mutation AddVote($post_id: ID!, $upvote: Boolean!, $username: String!) {
    addVote(post_id: $post_id, upvote: $upvote, username: $username) {
      id
      post_id
      username
      upvote
    }
  }
`;

export const DELETE_VOTE = gql`
  mutation DeleteVote($id: ID!) {
    deleteVote(id: $id) {
      id
      post_id
      username
    }
  }
`;
