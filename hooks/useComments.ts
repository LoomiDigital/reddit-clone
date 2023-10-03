import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import {
  GetCommentsByPostIdDocument,
  PostAttributesFragment,
  useAddCommentMutation,
  useGetCommentsByPostIdQuery,
} from "@d20/generated/graphql";

import { toast } from "react-hot-toast";

export const useComments = (post: PostAttributesFragment) => {
  const { data: session } = useSession();
  const { data: commentsData, loading } = useGetCommentsByPostIdQuery({
    variables: {
      post_id: post.id,
    },
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [addComment] = useAddCommentMutation();

  const {
    handleSubmit,
    reset,
    register,
    formState: { isValid },
  } = useForm<FormData>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitSuccessful(false);
    }
  }, [isSubmitSuccessful, reset]);

  const comments = commentsData?.commentsByPostId;

  type FormData = {
    comment: string;
  };

  const submitComment = handleSubmit(async (formData) => {
    const notification = toast.loading("Adding comment...");

    addComment({
      variables: {
        post_id: post.id,
        text: formData.comment,
        username: session?.user?.name!,
      },
      optimisticResponse(vars) {
        return {
          addComment: {
            __typename: "Comment",
            id: -1,
            post_id: post.id,
            text: vars.text,
            username: vars.username,
            created_at: new Date().toISOString(),
          },
        };
      },
      update: async (cache, { data }) => {
        const comment = await data?.addComment;

        cache.updateQuery(
          {
            query: GetCommentsByPostIdDocument,
            variables: {
              post_id: comment?.post_id,
            },
          },
          () => ({
            commentsByPostId: [comment!, ...comments!],
          })
        );

        setIsSubmitSuccessful(true);

        toast.success("Comment added!", { id: notification });
      },
    });
  });

  return {
    submitComment,
    register,
    comments,
    session,
    loading,
    isValid,
  };
};
