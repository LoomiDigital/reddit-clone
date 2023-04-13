import React from "react";
import { toast } from "react-hot-toast";

import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@d20/graphql/queries";
import Post from "./Post";

function Feed() {
  const { data, error } = useQuery(GET_POSTS);
  const posts: Post[] = data?.getPostList;

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
