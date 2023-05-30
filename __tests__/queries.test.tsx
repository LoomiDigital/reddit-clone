import { renderHook, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import {
  useGetCommentsByPostIdQuery,
  useGetPostsQuery,
  useGetSubredditByTopicQuery,
} from "../generated/graphql";
import { mockPosts, mockPostsResponse } from "../mocks/getPosts";
import {
  mockGetSubredditResponse,
  mockSubredditResponse,
} from "../mocks/getSubreddit";
import { act } from "react-dom/test-utils";
import { mockComments, mockCommentsResponse } from "@d20/mocks/getComments";

describe("GetPosts Query", () => {
  it("should return the correct post data", async () => {
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

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    await waitFor(() => {
      expect(result.current?.data).toEqual(mockPosts);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(undefined);
    });
  });
});

describe("GetSubredditByTopic Query", () => {
  it("should return the correct subreddit data", async () => {
    const { result } = renderHook(
      () =>
        useGetSubredditByTopicQuery({
          variables: {
            topic: "testsubreddit",
          },
        }),
      {
        wrapper: ({ children }) => (
          <MockedProvider mocks={[mockGetSubredditResponse]}>
            {children}
          </MockedProvider>
        ),
      }
    );

    expect(result.current.loading).toBe(true);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    await waitFor(() => {
      expect(result.current?.data).toEqual(mockSubredditResponse);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(undefined);
    });
  });
});

describe("GetCommentsByPostId Query", () => {
  it("should return the correct subreddit data", async () => {
    const { result } = renderHook(
      () =>
        useGetCommentsByPostIdQuery({
          variables: {
            post_id: 1,
          },
        }),
      {
        wrapper: ({ children }) => (
          <MockedProvider mocks={[mockCommentsResponse]}>
            {children}
          </MockedProvider>
        ),
      }
    );

    expect(result.current.loading).toBe(true);

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    await waitFor(() => {
      expect(result.current?.data).toEqual(mockComments);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(undefined);
    });
  });
});
