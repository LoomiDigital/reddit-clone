import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addApolloState, initializeApollo } from "@d20/client";
import {
  GetPostDocument,
  PostAttributesFragment,
  useAddCommentMutation,
} from "@d20/generated/graphql";
import { toast } from "react-hot-toast";

import PostCard from "@d20/Components/PostCard";

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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [addComment] = useAddCommentMutation();

  const submitComment = handleSubmit(async (formData) => {
    const notification = toast.loading("Adding comment...");

    addComment({
      variables: {
        post_id: post.id,
        text: formData.comment,
        username: session?.user?.name!,
      },
      onCompleted: () => {
        setValue("comment", "");
        toast.success("Comment added!", { id: notification });
      },
    });
  });

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <PostCard post={post} />
      <div className="rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comments as{" "}
          <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form onSubmit={submitComment} className="flex flex-col space-y-2">
          <textarea
            disabled={!session}
            {...register("comment", { required: true })}
            className="boder h-24 rounded-md border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are your thoughts?" : "Please log in to comment"
            }
          ></textarea>
          <button
            disabled={watch("comment") === "" || !session}
            type="submit"
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:cursor-default disabled:bg-gray-50"
          >
            Comment
          </button>
        </form>
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
