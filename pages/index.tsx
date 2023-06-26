import { useCallback } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { addApolloState, initializeApollo } from "@d20/graphql/client";
import {
  GetPostsDocument,
  GetPostsQuery,
  useGetPostsQuery,
} from "@d20/generated/graphql";
import { newPostIncoming } from "@d20/reactivities/posts";

import PostBox from "@d20/Components/Postbox";
import Feed from "@d20/Components/Feed";
import { PostLoader } from "@d20/Components/Loaders";

const Home: NextPage = () => {
  const { data, fetchMore, loading } = useGetPostsQuery({
    variables: {
      first: 4,
    },
  });

  const posts = data?.posts?.edges;
  const hasNextPage: boolean = data?.posts?.pageInfo?.hasNextPage!;

  const handleLoadMore = useCallback(
    () =>
      hasNextPage &&
      fetchMore({
        variables: {
          first: 4,
          after: data?.posts?.pageInfo.endCursor,
        },
        updateQuery(prevResult, { fetchMoreResult }): GetPostsQuery {
          const newEdges = fetchMoreResult?.posts?.edges!;
          const oldEdges = prevResult?.posts?.edges!;
          const pageInfo = fetchMoreResult?.posts?.pageInfo!;

          const oldIds = new Set(oldEdges?.map((edge) => edge?.node?.id));
          const filteredEdges = newEdges?.filter(
            (edge) => !oldIds.has(edge?.node?.id)
          );

          return newEdges?.length
            ? {
                __typename: prevResult?.__typename,
                posts: {
                  __typename: prevResult?.posts?.__typename,
                  edges: [...oldEdges!, ...filteredEdges!],
                  pageInfo,
                },
              }
            : prevResult;
        },
      }),
    [fetchMore, data?.posts?.pageInfo.endCursor, hasNextPage]
  );

  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore: handleLoadMore,
  });

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
      <Feed
        posts={posts}
        loading={loading || hasNextPage}
        loadingRef={sentryRef}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo({});

  await client.query({
    query: GetPostsDocument,
    variables: {
      first: 4,
    },
  });

  return addApolloState(client, {
    props: {},
  });
};

export default Home;
