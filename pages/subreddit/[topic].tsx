import { GetServerSideProps, NextPage } from "next";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { addApolloState, initializeApollo } from "@d20/graphql/client";
import {
  GetPostsByTopicDocument,
  GetPostsByTopicQuery,
  PostEdge,
  useGetPostsByTopicQuery,
} from "@d20/generated/graphql";

import Avatar from "@d20/components/Avatar";
import Postbox from "@d20/components/Postbox";
import Feed from "@d20/components/Feed";
import { useCallback } from "react";

type Props = {
  topic: string;
  posts: PostEdge[];
};

const Subreddit: NextPage<Props> = ({ topic }) => {
  const { data, fetchMore, loading } = useGetPostsByTopicQuery({
    variables: {
      first: 10,
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

  return (
    <div className="h-24 bg-red-400 p-8">
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-5">
            <Avatar seed={topic} large />
          </div>
          <div className="py-2">
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-5xl pb-10">
        <Postbox subreddit={topic} />
        <Feed
          posts={posts}
          loading={loading || hasNextPage}
          loadingRef={sentryRef}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const client = initializeApollo({});

  await client.query({
    query: GetPostsByTopicDocument,
    variables: {
      first: 10,
      topic: params?.topic,
    },
  });

  return addApolloState(client, {
    props: {
      topic: params?.topic,
    },
  });
};

export default Subreddit;
