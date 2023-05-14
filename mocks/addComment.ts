import { MockedResponse } from "@apollo/client/testing";
import { AddCommentDocument } from "@d20/generated/graphql";

export const mockAddComment: MockedResponse = {
  request: {
    query: AddCommentDocument,
    variables: {
      post_id: 1,
      text: "This is a new comment",
      username: "Buck",
    },
  },
  result: {
    data: {
      addComment: {
        id: 3,
        text: "This is a new comment",
        post_id: 1,
        created_at: "2023-05-08T18:10:10.831966Z",
        username: "Buck",
      },
    },
  },
};
