import "@testing-library/jest-dom/extend-expect";

import { renderHook, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { useGetPostsQuery } from "../generated/graphql";
import { mockPosts, mockPostsResponse } from "../mocks/getPosts";

describe("Home component", () => {
  it("returns the correct data", async () => {
    const { result } = renderHook(
      () =>
        useGetPostsQuery({
          variables: {
            first: 10,
          },
        }),
      {
        wrapper: ({ children }) => (
          <MockedProvider mocks={[mockPostsResponse]}>
            {children}
          </MockedProvider>
        ),
      }
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(result.current?.data).toEqual(mockPosts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(undefined);
  });
});
