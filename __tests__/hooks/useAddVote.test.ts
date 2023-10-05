import { renderHook } from "@testing-library/react";
import { isBoolean, isFunction, isNumber } from "lodash";

import { useAddVote } from "@d20/hooks/useAddVote";
import { mockComments } from "@d20/mocks/getComments";
import { mockPost } from "@d20/mocks/getPost";
import { mockSessionResponse } from "@d20/mocks/session";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => mockSessionResponse,
}));

jest.mock("@d20/generated/graphql", () => ({
  ...jest.requireActual("@d20/generated/graphql"),
  useUpdateVoteMutation: () => [jest.fn()],
  useGetCommentsByPostIdQuery: () => ({ data: mockComments, loading: false }),
}));

describe("useAddVote custom hook", () => {
  it("should return the expected values", async () => {
    const {
      result: { current },
    } = renderHook(({ post }) => useAddVote(post), {
      initialProps: {
        post: mockPost,
      },
    });

    const { upVote, displayVotes, vote } = current;

    expect(isFunction(upVote)).toBe(true);
    expect(isNumber(displayVotes)).toBe(true);
    expect(isBoolean(vote)).toBe(true);
  });
});
