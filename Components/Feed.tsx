import React from "react";
import { useReactiveVar } from "@apollo/client";
import { allPostsVar } from "@d20/reactivities/allPosts";
import { ClipLoader } from "react-spinners";

import Post from "./Post";

type Props = {
  loading: boolean;
  loadingRef: any;
};

function Feed({ loading, loadingRef }: Props) {
  const posts: Post[] = useReactiveVar(allPostsVar);

  return (
    <div className="mt-5 space-y-4">
      {/* @ts-ignore */}
      {posts?.map(({ node }) => {
        return (
          <div key={node.id}>
            <Post post={node} />
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
