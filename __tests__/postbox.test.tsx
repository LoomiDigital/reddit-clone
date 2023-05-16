import { MockedProvider } from "@apollo/client/testing";
import Postbox from "@d20/components/Postbox";
import { mockAddPost } from "@d20/mocks/addPost";
import { mockAddSubreddit } from "@d20/mocks/addSubreddit";
import { mockAddVote } from "@d20/mocks/addVote";
import {
  mockGetSubredditResponse,
  mockNoSubredditResponse,
  mockSubreddit,
} from "@d20/mocks/getSubreddit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event/";
import { SessionProvider } from "next-auth/react";
import { act } from "react-dom/test-utils";
import { toast } from "react-hot-toast";

describe("Postbox Component", () => {
  const toastSuccess = jest.spyOn(toast, "success");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new post with existing subreddit from form data", async () => {
    render(
      <MockedProvider
        mocks={[
          mockGetSubredditResponse,
          mockAddSubreddit,
          mockAddPost,
          mockAddVote,
        ]}
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
          <Postbox />
        </SessionProvider>
      </MockedProvider>
    );

    const postTitleInput = screen.getByPlaceholderText(
      "Create a post by entering a title!"
    );
    const imageOpenIcon = screen.getByTitle("Add an image");

    await act(() => {
      fireEvent.click(imageOpenIcon);
    });

    await userEvent.type(postTitleInput, "This is a new post");

    const postSubredditInput = screen.getByPlaceholderText("i.e. r/nextjs");
    const postBodyInput = screen.getByPlaceholderText("Text (optional)");
    const imageInput = screen.getByPlaceholderText("Image URL");

    await userEvent.type(postSubredditInput, "testsubreddit");
    await userEvent.type(imageInput, "https://via.placeholder.com/150");
    await userEvent.type(postBodyInput, "A brand new post!");

    const postButton = await screen.getByRole("button", {
      name: "Create Post",
    });

    await act(() => {
      fireEvent.click(postButton);
    });

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith("Post created!", {
        id: "1",
      });
    });
  });

  it("should create a new post with existing subreddit passed in as prop", async () => {
    render(
      <MockedProvider
        mocks={[
          mockGetSubredditResponse,
          mockAddSubreddit,
          mockAddPost,
          mockAddVote,
        ]}
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
          <Postbox subreddit={mockSubreddit.topic} />
        </SessionProvider>
      </MockedProvider>
    );

    const postTitleInput = screen.getByPlaceholderText(
      `Create a post in r/${mockSubreddit.topic}`
    );
    const imageOpenIcon = screen.getByTitle("Add an image");

    await act(() => {
      fireEvent.click(imageOpenIcon);
    });

    await userEvent.type(postTitleInput, "This is a new post");

    const postBodyInput = screen.getByPlaceholderText("Text (optional)");
    const imageInput = screen.getByPlaceholderText("Image URL");

    await userEvent.type(imageInput, "https://via.placeholder.com/150");
    await userEvent.type(postBodyInput, "A brand new post!");

    const postButton = await screen.getByRole("button", {
      name: "Create Post",
    });

    await act(() => {
      fireEvent.click(postButton);
    });

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith("Post created!", {
        id: "2",
      });
    });
  });

  it("should create a new post with no existing subreddit", async () => {
    render(
      <MockedProvider
        mocks={[
          mockNoSubredditResponse,
          mockAddSubreddit,
          mockAddPost,
          mockAddVote,
        ]}
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
          <Postbox />
        </SessionProvider>
      </MockedProvider>
    );

    const postTitleInput = screen.getByPlaceholderText(
      "Create a post by entering a title!"
    );
    const imageOpenIcon = screen.getByTitle("Add an image");

    await act(() => {
      fireEvent.click(imageOpenIcon);
    });

    await userEvent.type(postTitleInput, "This is a new post");

    const postSubredditInput = screen.getByPlaceholderText("i.e. r/nextjs");
    const postBodyInput = screen.getByPlaceholderText("Text (optional)");
    const imageInput = screen.getByPlaceholderText("Image URL");

    await userEvent.type(postSubredditInput, "testsubreddit");
    await userEvent.type(imageInput, "https://via.placeholder.com/150");
    await userEvent.type(postBodyInput, "A brand new post!");

    const postButton = await screen.getByRole("button", {
      name: "Create Post",
    });

    await act(() => {
      fireEvent.click(postButton);
    });

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith("Post created!", {
        id: "3",
      });
    });
  });
});
