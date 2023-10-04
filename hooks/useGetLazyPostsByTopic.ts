import { useCallback } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import {
  GetPostsByTopicQuery,
  useGetPostsByTopicQuery,
} from "@d20/generated/graphql";

export const useGetLazyPostsByTopic = (
  topic: string,
  numberOfPosts: number
) => {
  const { data, fetchMore, loading } = useGetPostsByTopicQuery({
    variables: {
      first: numberOfPosts,
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
