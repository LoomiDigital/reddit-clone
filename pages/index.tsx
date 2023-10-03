import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { useGetLazyPosts } from "@d20/hooks/useGetLazyPosts";

import { addApolloState, initializeApollo } from "@d20/graphql/client";
import { GetPostsDocument } from "@d20/generated/graphql";
import { newPostIncoming } from "@d20/reactivities/posts";

import PostBox from "@d20/Components/Postbox";
import Feed from "@d20/Components/Feed";
import { PostLoader } from "@d20/Components/Loaders";

const NUMBER_OF_POSTS = 4;

const Home: NextPage = () => {
  const { posts, loading, hasNextPage, sentryRef } =
    useGetLazyPosts(NUMBER_OF_POSTS);

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Head>
        <title>Reddit 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostBox />
      {newPostIncoming() && <PostLoader length={1} />}
      {posts?.length && (
        <Feed
          posts={posts}
          loading={loading || hasNextPage}
          loadingRef={sentryRef}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo({});

  await client.query({
    query: GetPostsDocument,
    variables: {
      first: NUMBER_OF_POSTS,
    },
  });

  return addApolloState(client, {
    props: {},
  });
};

export default Home;
