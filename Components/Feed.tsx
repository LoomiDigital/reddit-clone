import React from "react";
import { useReactiveVar } from "@apollo/client";
import { allPostsVar } from "@d20/reactivities/allPosts";

import Post from "./Post";

function Feed() {
  const posts: Post[] = useReactiveVar(allPostsVar);

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default Feed;
