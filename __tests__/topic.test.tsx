import { SessionProvider } from "next-auth/react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { useGetLazyPostsByTopic } from "@d20/hooks/useGetLazyPostsByTopic";
import {
  mockPostsByTopicResponse,
  mockUseGetLazyPostsByTopicReturn,
} from "@d20/mocks/getPostsByTopic";

import Feed from "@d20/Components/Feed";
import Subreddit from "@d20/pages/subreddit/[topic]";

jest.mock("@d20/hooks/useGetLazyPostsByTopic");
jest.mock("@d20/Components/Feed");

const mockUseGetLazyPostsByTopic =
  useGetLazyPostsByTopic as jest.MockedFunction<typeof useGetLazyPostsByTopic>;

describe("Home component", () => {
  it("should render the Feed component when posts are fetched", async () => {
    mockUseGetLazyPostsByTopic.mockReturnValue(
      mockUseGetLazyPostsByTopicReturn
    );

    render(
      <MockedProvider mocks={[mockPostsByTopicResponse]}>
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
          <Subreddit topic="testSubReddit" />
        </SessionProvider>
      </MockedProvider>
    );

    expect(Feed).toHaveBeenCalledTimes(1);
  });
});
