import { SessionProvider } from "next-auth/react";

import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { mockPosts, mockPostsResponse } from "../mocks/getPosts";
import { useGetLazyPosts } from "@d20/hooks/useGetLazyPosts";

import Feed from "@d20/Components/Feed";
import Home from "@d20/pages";

jest.mock("../hooks/useGetLazyPosts");
jest.mock("../Components/Feed");

const mockUseGetLazyPosts = useGetLazyPosts as jest.MockedFunction<
  typeof useGetLazyPosts
>;

describe("Home component", () => {
  it("should render the Feed component when posts are fetched", async () => {
    mockUseGetLazyPosts.mockReturnValue({
      posts: mockPosts.posts?.edges,
      loading: false,
      hasNextPage: true,
      sentryRef: jest.fn(),
    });

    render(
      <MockedProvider mocks={[mockPostsResponse]}>
        <SessionProvider
          session={{
            expires: "2021-10-10",
            user: {
              name: "Buck",
              expires: "2021-10-10",
              email: "user@test.com",
              address: "123 Fake St",
              image: "https://via.placeholder.com/150",
            },
          }}
        >
          <Home />
        </SessionProvider>
      </MockedProvider>
    );

    expect(Feed).toHaveBeenCalledTimes(1);
  });
});
