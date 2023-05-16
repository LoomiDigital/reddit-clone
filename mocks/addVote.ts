import { MockedResponse } from "@apollo/client/testing";
import { AddVoteDocument } from "@d20/generated/graphql";

export const mockAddVote: MockedResponse = {
  request: {
    query: AddVoteDocument,
    variables: {
      post_id: 1,
      username: "Buck",
      upvote: true,
    },
  },
  result: {
    data: {
      addVote: {
        __typename: "Vote",
        post_id: 1,
        upvote: true,
        username: "Buck",
      },
    },
  },
};
