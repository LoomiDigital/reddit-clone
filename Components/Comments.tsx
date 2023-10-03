import React from "react";
import { useComments } from "@d20/hooks/useComments";
import { PostAttributesFragment } from "@d20/generated/graphql";

import CommentCard from "./CommentCard";
import { CommentLoader } from "./Loaders";

interface Props {
  post: PostAttributesFragment;
}

const Comments = ({ post }: Props) => {
  const { submitComment, loading, comments, session, isValid, register } =
    useComments(post);

  return (
    <>
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
    </>
  );
};

export default Comments;
