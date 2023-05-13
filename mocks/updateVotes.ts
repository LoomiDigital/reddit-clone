import { UpdateVoteDocument } from "@d20/generated/graphql";

export const mockUpvote = {
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

export const mockDownvote = {
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
        post_id: 1,
        id: 1,
        username: "Buck",
        upvote: false,
      },
    },
  },
};
