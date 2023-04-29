import React from "react";
import { ClipLoader } from "react-spinners";
import { PostEdge } from "@d20/generated/graphql";

import PostCard from "./PostCard";

type Props = {
  loading: boolean;
  loadingRef: any;
  posts: PostEdge[] | undefined;
};

function Feed({ loading, loadingRef, posts }: Props) {
  return (
    <div className="mt-5 space-y-4">
      {posts?.map(({ node }) => {
        return (
          <div key={node!.id}>
            <PostCard post={node!} />
          </div>
        );
      })}
      {loading && (
        <div ref={loadingRef} className="flex flex-col items-center">
          <ClipLoader color="#ff4500" />
        </div>
      )}
    </div>
  );
}

export default Feed;
