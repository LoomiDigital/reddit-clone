import { MockedResponse } from "@apollo/client/testing";
import { GetCommentsByPostIdDocument } from "@d20/generated/graphql";

export const mockCommentsResponse: MockedResponse = {
  request: {
    query: GetCommentsByPostIdDocument,
    variables: {
      post_id: 1,
    },
  },
  result: {
    data: {
      commentsByPostId: [
        {
          id: 1,
          text: "a comment",
          post_id: 1,
          created_at: "2023-05-08T18:10:10.831966Z",
          username: "aUser",
        },
        {
          id: 2,
          text: "another comment",
          post_id: 1,
          created_at: "2023-05-08T18:10:10.831966Z",
          username: "aUser",
        },
      ],
    },
  },
};
