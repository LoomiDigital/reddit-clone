import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS, GET_POSTS_BY_TOPIC } from "@d20/graphql/queries";

import Post from "./Post";

type Props = {
  posts?: Post[];
  topic?: string;
};

function Feed({ posts, topic }: Props) {
  const query = !topic ? GET_POSTS : GET_POSTS_BY_TOPIC;
  const options = !topic
    ? {}
    : {
        variables: {
          topic,
        },
      };
  const { data } = useQuery(query, options);

  const realTimePosts: Post[] = !topic
    ? data?.getPostList
    : data?.getPostsByTopic;

  return (
    <div className="mt-5 space-y-4">
      {realTimePosts
        ? realTimePosts?.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))
        : posts?.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))}
    </div>
  );
}

export default Feed;
