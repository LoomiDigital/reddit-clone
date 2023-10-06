import { useComments } from "@d20/hooks/useComments";
import { mockComments, mockCommentsResponse } from "@d20/mocks/getComments";
import { mockPost } from "@d20/mocks/getPost";
import { mockSessionData, mockSessionResponse } from "@d20/mocks/session";
import { renderHook, screen } from "@testing-library/react";
import { isBoolean, isFunction } from "lodash";
import { act } from "react-dom/test-utils";

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => mockSessionResponse,
}));

jest.mock("@d20/generated/graphql", () => ({
  ...jest.requireActual("@d20/generated/graphql"),
  useAddCommentMutation: () => [jest.fn()],
  useGetCommentsByPostIdQuery: () => ({
    ...mockCommentsResponse.result,
    loading: false,
  }),
}));

describe("useComments custom hook", () => {
  it("should return the expected values", async () => {
    const {
      result: { current },
    } = renderHook(({ post }) => useComments(post), {
      initialProps: { post: mockPost },
    });

    const { register, submitComment, comments, formState, loading, session } =
      current;

    expect(isFunction(register)).toBe(true);
    expect(isFunction(submitComment)).toBe(true);
    expect(isBoolean(formState.isValid)).toBe(true);
    expect(isBoolean(loading)).toBe(true);
    expect(comments).toMatchObject(mockComments.commentsByPostId!);
    expect(session).toMatchObject(mockSessionData);
  });
});
