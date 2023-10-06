import { SessionProvider } from "next-auth/react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";

import { useGetLazyPosts } from "@d20/hooks/useGetLazyPosts";
import {
  mockPostsResponse,
  mockUseGetLazyPostsReturn,
} from "@d20/mocks/getPosts";

import Feed from "@d20/Components/Feed";
import Home from "@d20/pages";

jest.mock("@d20/hooks/useGetLazyPosts");
jest.mock("@d20/Components/Feed");

const mockUseGetLazyPosts = useGetLazyPosts as jest.MockedFunction<
  typeof useGetLazyPosts
>;

mockUseGetLazyPosts.mockReturnValue(mockUseGetLazyPostsReturn);

describe("Home component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = renderer
      .create(
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
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render the Feed component when posts are fetched", async () => {
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
