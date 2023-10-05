import { useSession } from "next-auth/react";
import { SyntheticEvent, useEffect, useState } from "react";

import {
  GetPostDocument,
  PostAttributesFragment,
  UpdateVoteDocument,
  useGetCommentsByPostIdQuery,
  useUpdateVoteMutation,
} from "@d20/generated/graphql";

import { toast } from "react-hot-toast";

export const useAddVote = (post: PostAttributesFragment) => {
  const [vote, setVote] = useState<boolean | null>();
  const [displayVotes, setDisplayVotes] = useState<number>(0);
  const [updateVote] = useUpdateVoteMutation();

  const { data: session } = useSession();

  const { data: commentsData, loading } = useGetCommentsByPostIdQuery({
    variables: {
      post_id: post.id,
    },
  });

  const comments = commentsData?.commentsByPostId;
  const votes = post?.votes;

  useEffect(() => {
    const userVote = votes?.find(
      (vote) => vote?.username === session?.user?.name
    )?.upvote;

    setVote(userVote);
  }, [votes, session]);

  useEffect(() => {
    const totalVotes = votes?.reduce(
      (total, vote) => (vote?.upvote ? ++total : --total),
      0
    );

    setDisplayVotes(totalVotes!);
  }, [votes]);

  const upVote = async (e: SyntheticEvent, isUpvote: boolean) => {
    e.preventDefault();

    if (!session) {
      toast.error("Log in to upvote");
      return;
    }

    if (isUpvote && vote) {
      toast.error("You may only upvote once");
      return;
    }

    if (!isUpvote && vote === false) {
      toast.error("You may only downvote once");
      return;
    }

    updateVote({
      variables: {
        post_id: post.id,
        upvote: isUpvote,
        username: session?.user.name,
      },
      optimisticResponse(vars) {
        return {
          updateVote: {
            __typename: "Vote",
            id: -1,
            post_id: vars.post_id,
            upvote: vars.upvote,
            username: vars.username,
          },
        };
      },
      update(cache, { data }) {
        const isUpvote = data?.updateVote?.upvote;
        const updatedUpvotes = isUpvote ? displayVotes + 2 : displayVotes - 2;

        cache.writeQuery({
          query: UpdateVoteDocument,
          variables: {
            post_id: post.id,
          },
          data: {
            updateVote: {
              __typename: "Vote",
              id: data?.updateVote?.id,
              post_id: post.id,
              upvote: isUpvote,
              username: session?.user.name,
            },
          },
        });

        setDisplayVotes(updatedUpvotes);
        setVote(isUpvote);
      },
      refetchQueries: [
        {
          query: GetPostDocument,
          variables: {
            id: post.id,
          },
        },
      ],
    });
  };

  return {
    upVote,
    comments,
    vote,
    loading,
    displayVotes,
  };
};
