import { renderHook } from "@testing-library/react";
import { isFunction } from "lodash";

import { useAddPost } from "@d20/hooks/useAddPost";
import { mockSessionData, mockSessionResponse } from "@d20/mocks/session";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => mockSessionResponse,
}));

jest.mock("@d20/generated/graphql", () => ({
  ...jest.requireActual("@d20/generated/graphql"),
  useAddPostMutation: () => [jest.fn()],
  useAddVoteMutation: () => [jest.fn()],
  useAddSubredditMutation: () => [jest.fn()],
  useGetSubredditByTopicLazyQuery: () => [jest.fn()],
}));

describe("useAddPost custom hook", () => {
  it("should return the expected values", async () => {
    const {
      result: { current },
    } = renderHook(({ subreddit }) => useAddPost(subreddit), {
      initialProps: {
        subreddit: "testsub",
      },
    });

    const { register, setValue, submitPost, watch, errors, session } = current;

    expect(isFunction(register)).toBe(true);
    expect(isFunction(setValue)).toBe(true);
    expect(isFunction(submitPost)).toBe(true);
    expect(isFunction(watch)).toBe(true);
    expect(errors).toBeDefined();
    expect(session).toMatchObject(mockSessionData);
  });
});
