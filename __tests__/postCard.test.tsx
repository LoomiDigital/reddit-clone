import { SessionProvider } from "next-auth/react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  mockPost,
  mockPostResponse,
  mockPostUpvoted,
} from "@d20/mocks/getPost";
import { mockCommentsResponse } from "@d20/mocks/getComments";
import { mockDownvote, mockUpvote } from "@d20/mocks/updateVotes";

import PostCard from "@d20/components/PostCard";

describe("PostCard component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the correct number of posts", async () => {
    const { getByText } = render(
      <MockedProvider mocks={[mockPostResponse, mockCommentsResponse]}>
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
          <PostCard post={mockPost} />
        </SessionProvider>
      </MockedProvider>
    );

    expect(getByText("Test Post")).toBeInTheDocument();
  });

  it("casts an upvote", async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={[mockCommentsResponse, mockPostResponse, mockUpvote]}
      >
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
          <PostCard post={mockPost} />
        </SessionProvider>
      </MockedProvider>
    );

    const upvoteButton = getByTestId("upvote").firstChild as HTMLElement;

    fireEvent.click(upvoteButton);

    expect(await screen.findByText("1")).toBeInTheDocument();
    expect(upvoteButton).toHaveClass("text-red-400");
  });

  it("casts a downvote", async () => {
    const { getByTestId } = render(
      <MockedProvider
        mocks={[mockCommentsResponse, mockPostResponse, mockDownvote]}
      >
        <SessionProvider
          session={{
            expires: "2021-10-10",
            user: {
              name: "Buck",
              expires: "2021-10-10",
              email: "user@test.com",
              address: "123 Fake St",
              image: "https://via.pla ceholder.com/150",
            },
          }}
        >
          <PostCard post={mockPostUpvoted} />
        </SessionProvider>
      </MockedProvider>
    );

    const downButton = getByTestId("downvote").firstChild as HTMLElement;

    fireEvent.click(downButton);

    expect(await screen.findByText("-1")).toBeInTheDocument();
    expect(downButton).toHaveClass("text-blue-400");
  });

  it("displays the correct number of comments", async () => {
    render(
      <MockedProvider mocks={[mockCommentsResponse]}>
        <SessionProvider
          session={{
            expires: "2021-10-10",
            user: {
              name: "Buck",
              expires: "2021-10-10",
              email: "user@test.com",
              address: "123 Fake St",
              image: "https://via.pla ceholder.com/150",
            },
          }}
        >
          <PostCard post={mockPost} />
        </SessionProvider>
      </MockedProvider>
    );

    expect(await screen.findByText("2 Comments")).toBeInTheDocument();
  });
});