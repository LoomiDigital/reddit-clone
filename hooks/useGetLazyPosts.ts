import { useCallback } from "react";

import { GetPostsQuery, useGetPostsQuery } from "@d20/generated/graphql";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const useGetLazyPosts = (numberOfPosts: number) => {
  const { data, fetchMore, loading } = useGetPostsQuery({
    variables: {
      first: numberOfPosts,
    },
  });

  const posts = data?.posts?.edges;
  const hasNextPage: boolean = data?.posts?.pageInfo?.hasNextPage!;

  const handleLoadMore = useCallback(
    () =>
      hasNextPage &&
      fetchMore({
        variables: {
          first: numberOfPosts,
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
    [fetchMore, data?.posts?.pageInfo.endCursor, hasNextPage, numberOfPosts]
  );

  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore: handleLoadMore,
  });

  return {
    sentryRef,
    posts,
    loading,
    hasNextPage,
  };
};
