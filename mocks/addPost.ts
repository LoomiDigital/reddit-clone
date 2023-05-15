import { MockedResponse } from "@apollo/client/testing";
import { AddPostDocument } from "@d20/generated/graphql";

export const mockAddPost: MockedResponse = {
  request: {
    query: AddPostDocument,
    variables: {
      title: "This is a new post",
      body: "A brand new post!",
      image: "https://via.placeholder.com/150",
      username: "Buck",
      subreddit_id: 1,
      subreddit_topic: "testsubreddit",
    },
  },
  result: {
    data: {
      insertPost: {
        __typename: "Post",
        id: 1,
        title: "This is a new post",
        body: "A brand new post!",
        image: "https://via.placeholder.com/150",
        username: "Buck",
        subreddit_id: 1,
        subreddit_topic: "testsubreddit",
        created_at: "2021-08-15T20:00:00.000Z",
        votes: [
          {
            __typename: "Vote",
            id: -1,
            post_id: 1,
            username: "Buck",
            upvote: true,
          },
        ],
      },
    },
  },
};
