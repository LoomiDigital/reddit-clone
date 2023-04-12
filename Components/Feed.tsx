import React from "react";
import { toast } from "react-hot-toast";

import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@d20/graphql/queries";

function Feed() {
  const { data, error } = useQuery(GET_POSTS);
  const posts: Post[] = data?.getPostList;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

export default Feed;
