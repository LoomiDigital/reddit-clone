import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { SessionProvider } from "next-auth/react";
import { MockedProvider } from "@apollo/client/testing";

import {
  mockPost,
  mockPostResponse,
  mockPostUpvoted,
} from "@d20/mocks/getPost";
import { mockCommentsResponse } from "@d20/mocks/getComments";
import { mockDownvote, mockUpvote } from "@d20/mocks/updateVotes";

import PostCard from "@d20/Components/PostCard";

describe("PostCard component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = renderer
      .create(
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
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render a post correctly", async () => {
    render(
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

    expect(await screen.findByText("Test Post")).toBeInTheDocument();
  });

  it("should cast an upvote", async () => {
    render(
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

    const upvoteButton = await screen.findByTitle("upvote");

    fireEvent.click(upvoteButton);

    expect((await screen.findByTitle("votes")).innerHTML).toBe("1");
    expect(upvoteButton.parentElement).toHaveClass("text-red-400");
  });

  it("should cast a downvote", async () => {
    render(
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

    const downButton = screen.getByTitle("downvote");

    fireEvent.click(downButton);

    expect((await screen.findByTitle("votes")).innerHTML).toBe("-1");
    expect(downButton.parentElement).toHaveClass("text-blue-400");
  });

  it("should display the correct number of comments", async () => {
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
