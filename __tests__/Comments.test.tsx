import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { SessionProvider } from "next-auth/react";

import { useComments } from "@d20/hooks/useComments";
import { mockUseCommentsReturn } from "@d20/mocks/getComments";

import { mockPostsResponse } from "@d20/mocks/getPosts";
import { mockPost } from "@d20/mocks/getPost";

import Comments from "@d20/Components/Comments";
import CommentCard from "@d20/Components/CommentCard";
import { CommentLoader } from "@d20/Components/Loaders";

jest.mock("../hooks/useComments");
jest.mock("../Components/CommentCard");

jest.mock("@d20/Components/Loaders", () => ({
  ...jest.requireActual("@d20/Components/Loaders"),
  CommentLoader: jest.fn(),
}));

const mockUseComments = useComments as jest.MockedFunction<typeof useComments>;

describe("Comments component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the loader component when comments are loading", async () => {
    mockUseComments.mockReturnValue({
      ...mockUseCommentsReturn,
      loading: true,
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
          <Comments post={mockPost} />
        </SessionProvider>
      </MockedProvider>
    );

    expect(CommentLoader).toHaveBeenCalled();
  });

  it("should render the CommentCard component once per comment", async () => {
    mockUseComments.mockReturnValue(mockUseCommentsReturn);

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
          <Comments post={mockPost} />
        </SessionProvider>
      </MockedProvider>
    );

    expect(CommentCard).toHaveBeenCalledTimes(2);
  });
});
