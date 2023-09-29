import { useCallback } from "react";

import {
  GetPostsByTopicQuery,
  useGetPostsByTopicQuery,
} from "@d20/generated/graphql";

import useInfiniteScroll from "react-infinite-scroll-hook";

export const useGetLazyPostsByTopic = (topic: string) => {
  const NUMBER_OF_POSTS = 4;

  const { data, fetchMore, loading } = useGetPostsByTopicQuery({
    variables: {
      first: NUMBER_OF_POSTS,
      topic,
    },
  });

  const posts = data?.postsByTopic?.edges;
  const hasNextPage: boolean = data?.postsByTopic?.pageInfo?.hasNextPage!;

  const handleLoadMore = useCallback(
    () =>
      hasNextPage &&
      fetchMore({
        variables: {
          after: data?.postsByTopic?.pageInfo.endCursor,
        },
        updateQuery(prevResult, { fetchMoreResult }): GetPostsByTopicQuery {
          const newEdges = fetchMoreResult?.postsByTopic?.edges!;
          const oldEdges = prevResult?.postsByTopic?.edges!;
          const pageInfo = fetchMoreResult?.postsByTopic?.pageInfo!;

          const oldIds = new Set(oldEdges?.map((edge) => edge?.node?.id));
          const filteredEdges = newEdges?.filter(
            (edge) => !oldIds.has(edge?.node?.id)
          );

          return newEdges?.length
            ? {
                postsByTopic: {
                  __typename: prevResult?.postsByTopic?.__typename,
                  edges: [
                    ...prevResult?.postsByTopic?.edges!,
                    ...filteredEdges!,
                  ],
                  pageInfo,
                },
              }
            : prevResult;
        },
      }),
    [fetchMore, data?.postsByTopic?.pageInfo.endCursor, hasNextPage]
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
