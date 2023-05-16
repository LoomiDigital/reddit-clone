import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SessionProvider } from "next-auth/react";
import { mockPostConnection, mockPostsResponse } from "@d20/mocks/getPosts";

import Feed from "@d20/components/Feed";
import PostCard from "@d20/components/PostCard";
import { PostLoader } from "@d20/components/Loaders";

jest.mock("@d20/components/PostCard");
jest.mock("@d20/components/Loaders", () => ({
  PostLoader: jest.fn(),
}));

describe("Feed component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("handles the loading state", async () => {
    render(
      <MockedProvider>
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
          <Feed
            loading={true}
            loadingRef={() => {}}
            posts={mockPostConnection.edges}
          />
        </SessionProvider>
      </MockedProvider>
    );

    expect(PostLoader).toHaveBeenCalled();
  });

  it("renders the correct number of posts", async () => {
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
          <Feed
            loading={false}
            loadingRef={() => {}}
            posts={mockPostConnection.edges}
          />
        </SessionProvider>
      </MockedProvider>
    );

    expect(PostCard).toHaveBeenCalledTimes(2);
  });
});
