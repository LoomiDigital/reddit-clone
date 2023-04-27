import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_ID = gql`
  query GetSubredditById($id: ID!) {
    getSubredditById(id: $id) {
      id
      topic
      created_at
    }
  }
`;

export const GET_SUBREDDITS = gql`
  query GetSubreddits {
    getSubredditList {
      id
      topic
      created_at
    }
  }
`;

export const GET_POSTS_REACTIVE = gql`
  query GetPosts {
    allPostsVar @client
  }
`;

export const GET_POSTS_BY_TOPIC_REACTIVE = gql`
  query GetPostsByTopic {
    postsByTopicVar @client
  }
`;

export const GET_VOTES_BY_POST_AND_USER = gql`
  query GetVotesByPostAndUser($post_id: ID!, $username: String!) {
    getVotesByPostIdAndUsername(post_id: $post_id, username: $username) {
      id
      post_id
      username
      upvote
    }
  }
`;

export const GET_VOTES_BY_POST_ID = gql`
  query GetVotesByPostId($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      username
      upvote
    }
  }
`;
