import { GetServerSideProps } from "next";
import { addApolloState, initializeApollo } from "@d20/graphql/client";
import {
  GetPostDocument,
  PostAttributesFragment,
} from "@d20/generated/graphql";

import { CommentLoader } from "@d20/Components/Loaders";
import PostCard from "@d20/Components/PostCard";

import CommentCard from "@d20/Components/CommentCard";
import { useAddComment } from "@d20/hooks/useAddComment";

type Params = {
  postId: string;
};

type Props = {
  post: PostAttributesFragment;
};

function PostPage({ post }: Props) {
  const { submitComment, loading, comments, session, isValid, register } =
    useAddComment(post);

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
            className="h-24 rounded-sm border border-gray-200 p-2 pl-4 outline-none focus-within:border-gray-900 disabled:bg-gray-50"
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
