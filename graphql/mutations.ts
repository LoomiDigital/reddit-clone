import { gql } from "@apollo/client";

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
