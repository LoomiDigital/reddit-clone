import { MockedResponse } from "@apollo/client/testing";
import { UpdateVoteDocument } from "@d20/generated/graphql";

export const mockUpvote: MockedResponse = {
  request: {
    query: UpdateVoteDocument,
    variables: {
      post_id: 1,
      upvote: true,
      username: "Buck",
    },
  },
  result: {
    data: {
      updateVote: {
        post_id: 1,
        id: 1,
        username: "Buck",
        upvote: true,
      },
    },
  },
};

export const mockDownvote: MockedResponse = {
  request: {
    query: UpdateVoteDocument,
    variables: {
      post_id: 1,
      upvote: false,
      username: "Buck",
    },
  },
  result: {
    data: {
      updateVote: {
        __typename: "Vote",
        post_id: 1,
        id: 1,
        username: "Buck",
        upvote: false,
      },
    },
  },
};
