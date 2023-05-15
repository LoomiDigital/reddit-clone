import { MockedResponse } from "@apollo/client/testing";
import {
  GetSubredditByTopicDocument,
  SubredditAttributesFragment,
} from "@d20/generated/graphql";

export const mockGetSubredditResponse: MockedResponse = {
  request: {
    query: GetSubredditByTopicDocument,
    variables: {
      topic: "testsubreddit",
    },
  },
  result: {
    data: {
      id: 1,
      topic: "testsubreddit",
      created_at: "2021-08-15T20:00:00.000Z",
    },
  },
};

export const mockSubreddit: SubredditAttributesFragment = {
  id: 1,
  topic: "testsubreddit",
  created_at: "2021-08-15T20:00:00.000Z",
};
