import { MockedResponse } from "@apollo/client/testing";
import {
  GetSubredditByTopicDocument,
  GetSubredditByTopicQuery,
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
      getSubredditByTopic: {
        __typename: "Subreddit",
        id: 1,
        topic: "testsubreddit",
        created_at: "2021-08-15T20:00:00.000Z",
      },
    },
  },
};

export const mockNoSubredditResponse: MockedResponse = {
  request: {
    query: GetSubredditByTopicDocument,
    variables: {
      topic: "testsubreddit",
    },
  },
  result: {
    data: {
      getSubredditByTopic: null,
    },
  },
};

export const mockSubreddit: SubredditAttributesFragment = {
  id: 1,
  topic: "testsubreddit",
  created_at: "2021-08-15T20:00:00.000Z",
};

export const mockSubredditResponse: GetSubredditByTopicQuery = {
  getSubredditByTopic: {
    __typename: "Subreddit",
    ...mockSubreddit,
  },
};
