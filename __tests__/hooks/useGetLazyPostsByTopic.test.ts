import { renderHook } from "@testing-library/react";
import { useGetLazyPostsByTopic } from "@d20/hooks/useGetLazyPostsByTopic";

import { mockPostsByTopic } from "@d20/mocks/getPostsByTopic";

jest.mock("@d20/generated/graphql", () => ({
  ...jest.requireActual("@d20/generated/graphql"),
  useGetPostsByTopicQuery: () => ({ data: mockPostsByTopic, loading: false }),
}));

describe("UseGetLazyPostsByTopic custom hook", () => {
  it("should return the expected values", async () => {
    const {
      result: { current },
    } = renderHook(
      ({ numberOfPosts }) =>
        useGetLazyPostsByTopic("aSubReddit", numberOfPosts),
      {
        initialProps: { numberOfPosts: 2 },
      }
    );

    const { sentryRef, posts, hasNextPage, loading } = current;

    expect(posts).toBeDefined();
    expect(hasNextPage).toBeDefined();
    expect(loading).toBeDefined();
    expect(sentryRef).toBeDefined();
  });
});
