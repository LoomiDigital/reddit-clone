import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query GetSubredditByTopic($topic: String!) {
    getSubredditByTopic(topic: $topic) {
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

export const GET_POSTS = gql`
  query GetPosts {
    getPostList {
      id
      title
      body
      image
      username
      subreddit_id
      created_at
      comments {
        id
        text
        post_id
        username
        created_at
      }
      votes {
        id
        post_id
        username
        created_at
        upvote
      }
      subreddit {
        id
        topic
        created_at
      }
    }
  }
`;

export const GET_POSTS_BY_TOPIC = gql`
  query GetPostsByTopic($topic: String!) {
    getPostsByTopic(topic: $topic) {
      id
      title
      body
      image
      username
      subreddit_id
      created_at
      comments {
        id
        text
        post_id
        username
        created_at
      }
      votes {
        id
        post_id
        username
        created_at
        upvote
      }
      subreddit {
        id
        topic
        created_at
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    getPostById(id: $id) {
      id
      title
      body
      image
      username
      subreddit_id
      created_at
      comments {
        id
        text
        post_id
        username
        created_at
      }
      votes {
        id
        post_id
        username
        created_at
        upvote
      }
      subreddit {
        id
        topic
        created_at
      }
    }
  }
`;
