import React from "react";
import { toast } from "react-hot-toast";

import { useQuery } from "@apollo/client";
import { GET_POSTS, GET_POSTS_BY_TOPIC } from "@d20/graphql/queries";
import Post from "./Post";

type Props = {
  topic?: string;
};

function Feed({ topic }: Props) {
  const { data } = !topic
    ? useQuery(GET_POSTS)
    : useQuery(GET_POSTS_BY_TOPIC, {
        variables: { topic: topic },
      });

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostsByTopic;

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
