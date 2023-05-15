import { MockedResponse } from "@apollo/client/testing";
import { AddSubredditDocument } from "@d20/generated/graphql";

export const mockAddSubreddit: MockedResponse = {
  request: {
    query: AddSubredditDocument,
    variables: {
      topic: "testsubreddit",
    },
  },
  result: {
    data: {
      insertSubreddit: {
        __typename: "Subreddit",
        id: 1,
        post_id: 1,
        topic: "testsubreddit",
        created_at: "2021-08-15T20:00:00.000Z",
      },
    },
  },
};
