import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { addApolloState, initializeApollo } from "@d20/graphql/client";
import {
  GetPostDocument,
  PostAttributesFragment,
  useAddCommentMutation,
  useGetCommentsByPostIdQuery,
} from "@d20/generated/graphql";

import { toast } from "react-hot-toast";

import { CommentLoader } from "@d20/Components/Loaders";
import PostCard from "@d20/Components/PostCard";

import CommentCard from "@d20/Components/CommentCard";

type Params = {
  postId: string;
};

type Props = {
  post: PostAttributesFragment;
};

type FormData = {
  comment: string;
};

function PostPage({ post }: Props) {
  const { data: session } = useSession();
  const { data: commentsData, loading } = useGetCommentsByPostIdQuery({
    variables: {
      post_id: post.id,
    },
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [addComment] = useAddCommentMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitSuccessful(false);
    }
  }, [isSubmitSuccessful, reset]);

  const comments = commentsData?.commentsByPostId;

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

        cache.modify({
          fields: {
            commentsByPostId() {
              return [comment!, ...comments!];
            },
          },
        });

        setIsSubmitSuccessful(true);

        toast.success("Comment added!", { id: notification });
      },
    });
  });

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <PostCard post={post} />
      <div className="mt-5 rounded-t-md border border-b-0 border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comments as{" "}
          <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form onSubmit={submitComment} className="flex flex-col space-y-2">
          <textarea
            disabled={!session}
            {...register("comment", { required: true })}
            className="boder h-24 rounded-sm border border-gray-200 p-2 pl-4 outline-none focus-within:border-gray-900 disabled:bg-gray-50"
            placeholder={
              session ? "What are your thoughts?" : "Please log in to comment"
            }
          ></textarea>
          <button
            disabled={!isValid || !session}
            type="submit"
            name="comment"
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:cursor-default disabled:bg-gray-500 disabled:text-gray-300"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="rounded-b-md border border-t-0 border-gray-300 bg-white px-10 py-5">
        <hr className="py-2" />
        {loading ? (
          <CommentLoader length={10} />
        ) : (
          comments?.map((comment) => (
            <CommentCard key={comment?.id} comment={comment!} />
          ))
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const client = initializeApollo({});
  const {
    data: { getPost },
  } = await client.query({
    query: GetPostDocument,
    variables: {
      id: params!.postId,
    },
  });

  const post: PostAttributesFragment = getPost;

  const documentProps = addApolloState(client, {
    props: {
      post,
    },
  });

  return { props: documentProps.props };
};

export default PostPage;
