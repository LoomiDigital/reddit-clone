import { MockedProvider } from "@apollo/client/testing";
import { SessionProvider } from "next-auth/react";
import { render, screen } from "@testing-library/react";
import { mockPostResponse } from "@d20/mocks/getPost";
import { mockComment, mockCommentsResponse } from "@d20/mocks/getComments";

import CommentCard from "@d20/components/CommentCard";

describe("CommentCard component", () => {
  it("renders the comment correctly", async () => {
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
          <CommentCard comment={mockComment} />
        </SessionProvider>
      </MockedProvider>
    );

    expect(await screen.findByText("An amazing comment")).toBeInTheDocument();
    expect(await screen.findByText("aUser")).toBeInTheDocument();
  });
});
