import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { SessionProvider } from "next-auth/react";
import { mockPost, mockPostResponse } from "@d20/mocks/getPost";
import { mockCommentsResponse } from "@d20/mocks/getComments";
import { mockAddComment } from "@d20/mocks/addComment";

import PostPage from "@d20/pages/post/[postId]";
import { CommentLoader } from "@d20/components/Loaders";

jest.mock("../components/Loaders", () => ({
  CommentLoader: jest.fn(),
}));

describe("Post component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display the loader during the loading state", async () => {
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
              image: "https://via.pla ceholder.com/150",
            },
          }}
        >
          <PostPage post={mockPost} />
        </SessionProvider>
      </MockedProvider>
    );

    expect(CommentLoader).toHaveBeenCalled();
  });

  it("should render the correct number of comments", async () => {
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
              image: "https://via.pla ceholder.com/150",
            },
          }}
        >
          <PostPage post={mockPost} />
        </SessionProvider>
      </MockedProvider>
    );

    expect(await screen.findAllByText("aUser")).toHaveLength(2);
  });

  it("should render a new comment", async () => {
    render(
      <MockedProvider
        mocks={[mockPostResponse, mockCommentsResponse, mockAddComment]}
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
          <PostPage post={mockPost} />
        </SessionProvider>
      </MockedProvider>
    );

    const commentInput = screen.getByPlaceholderText("What are your thoughts?");

    await userEvent.type(commentInput, "This is a new comment");

    const commentButton = screen.getByRole("button", { name: "Comment" });

    fireEvent.click(commentButton);

    expect(
      await screen.findByText("This is a new comment")
    ).toBeInTheDocument();
  });
});
