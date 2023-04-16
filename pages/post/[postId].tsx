import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import { ParsedUrlQuery } from "querystring";
import { GET_POSTS, GET_POST_BY_ID } from "@d20/graphql/queries";

import Post from "@d20/Components/Post";
import client from "@d20/apollo-client";

type Params = {
  params: {
    postId: string;
  };
};

type Props = {
  post: Post;
};

function PostPage({ post }: Props) {
  return (
    <div className="mx-auto my-7 mt-5 max-w-5xl space-y-4">
      <Post post={post} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const {
    data: { getPostList },
  } = await client.query({
    query: GET_POSTS,
  });

  const posts: Post[] = getPostList;

  const paths = posts.map((post: Post) => ({
    params: {
      postId: post.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const {
    data: { getPostById },
  } = await client.query({
    query: GET_POST_BY_ID,
    variables: {
      id: params.postId,
    },
  });

  const post: Post = getPostById;

  return {
    props: {
      post: post,
    },
  };
};

export default PostPage;
