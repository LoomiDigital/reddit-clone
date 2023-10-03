import { renderHook } from "@testing-library/react";
import { useGetLazyPosts } from "@d20/hooks/useGetLazyPosts";
import { mockPosts } from "@d20/mocks/getPosts";

jest.mock("../generated/graphql", () => ({
  ...jest.requireActual("../generated/graphql"),
  useGetPostsQuery: () => ({ data: mockPosts, loading: false }),
}));

describe("UseGetLazyPosts custom hook", () => {
  it("should return the correct values", async () => {
    const {
      result: { current },
    } = renderHook(({ numberOfPosts }) => useGetLazyPosts(numberOfPosts), {
      initialProps: { numberOfPosts: 2 },
    });

    const { sentryRef, posts, hasNextPage, loading } = current;

    expect(posts).toBeDefined();
    expect(hasNextPage).toBeDefined();
    expect(loading).toBeDefined();
    expect(sentryRef).toBeDefined();
  });
});
