import { GetStaticPaths, GetStaticProps } from "next";
import client from "@d20/apollo-client";
import { GET_POSTS, GET_POST_BY_ID } from "@d20/graphql/queries";

import Post from "@d20/Components/Post";

type Params = {
  postId: string;
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

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { getPostList },
  } = await client.query({
    query: GET_POSTS,
  });

  const paths = getPostList.posts.map((post: Post) => ({
    params: {
      postId: post.id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const {
    data: { getPostById },
  } = await client.query({
    query: GET_POST_BY_ID,
    variables: {
      id: params!.postId,
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
