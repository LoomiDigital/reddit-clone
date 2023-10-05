import { isBoolean, isFunction } from "lodash";
import { renderHook } from "@testing-library/react";

import { useGetLazyPosts } from "@d20/hooks/useGetLazyPosts";
import { mockPosts } from "@d20/mocks/getPosts";

jest.mock("@d20/generated/graphql", () => ({
  ...jest.requireActual("@d20/generated/graphql"),
  useGetPostsQuery: () => ({ data: mockPosts, loading: false }),
}));

describe("UseGetLazyPosts custom hook", () => {
  it("should return the expected values", async () => {
    const {
      result: { current },
    } = renderHook(({ numberOfPosts }) => useGetLazyPosts(numberOfPosts), {
      initialProps: { numberOfPosts: 2 },
    });

    const { sentryRef, posts, hasNextPage, loading } = current;

    expect(Array.isArray(posts)).toBe(true);
    expect(isBoolean(hasNextPage)).toBe(true);
    expect(isBoolean(loading)).toBe(true);
    expect(isFunction(sentryRef)).toBe(true);
  });
});
