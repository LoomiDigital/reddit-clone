import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { ParsedUrlQuery } from "querystring";
import { GET_POST_BY_ID } from "@d20/graphql/queries";

import Post from "@d20/Components/Post";

interface ParsedTopic extends ParsedUrlQuery {
  postId: string;
}

function PostPage() {
  const { postId } = useRouter().query as ParsedTopic;
  const { data } = useQuery(GET_POST_BY_ID, {
    variables: {
      id: postId,
    },
  });

  const post: Post = data?.getPostById;

  return (
    <div className="mx-auto my-7 mt-5 max-w-5xl space-y-4">
      <Post post={post} />
    </div>
  );
}

export default PostPage;
