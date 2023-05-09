import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { addApolloState, initializeApollo } from "@d20/client";
import {
  GetPostDocument,
  PostAttributesFragment,
  useAddCommentMutation,
  useGetCommentsByPostIdQuery,
} from "@d20/generated/graphql";
import Timeago from "react-timeago";
import { toast } from "react-hot-toast";

import PostCard from "@d20/Components/PostCard";
import Avatar from "@d20/Components/Avatar";

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
  const { data: commentsData } = useGetCommentsByPostIdQuery({
    variables: {
      post_id: post.id,
    },
  });
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [addComment] = useAddCommentMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<FormData>();

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
              return [...comments!, comment!];
            },
          },
        });

        setValue("comment", "");
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
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:cursor-default disabled:bg-gray-500 disabled:text-gray-300"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="rounded-b-md border border-t-0 border-gray-300 bg-white px-10 py-5">
        <hr className="py-2" />
        {comments?.map((comment) => (
          <div
            key={comment?.id}
            className="relative flex items-center space-x-2 space-y-10"
          >
            <hr className="absolute left-7 top-16 z-0 h-16 border" />
            <div className="z-50">
              <Avatar seed={comment?.username} />
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {comment?.username}
                </span>{" "}
                • {hasMounted && <Timeago date={comment?.created_at} />}
              </p>
              <p className="text-sm">{comment?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const client = initializeApollo({} as unknown as null);
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
