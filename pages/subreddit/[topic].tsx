import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useQuery } from "@apollo/client";
import { addApolloState, initializeApollo } from "@d20/client";
import { GET_POSTS_BY_TOPIC } from "@d20/graphql/queries";
import { allPostsVar } from "@d20/reactivities/allPosts";
import useInfiniteScroll from "react-infinite-scroll-hook";

import Avatar from "@d20/Components/Avatar";
import Postbox from "@d20/Components/Postbox";
import Feed from "@d20/Components/Feed";

type Params = {
  topic: string;
};

type Props = {
  topic: string;
};

const Subreddit: NextPage<Props> = ({ topic }) => {
  const { data, fetchMore, loading } = useQuery(GET_POSTS_BY_TOPIC, {
    variables: {
      first: 10,
      topic,
    },
  });

  const posts: Post[] = data?.postByTopicCollection.edges;
  const hasNextPage: boolean = data?.postByTopicCollection.pageInfo.hasNextPage;

  useEffect(() => {
    allPostsVar(posts);
  }, [posts]);

  const handleLoadMore = () => {
    hasNextPage &&
      fetchMore({
        variables: {
          after: data?.postByTopicCollection.pageInfo.endCursor,
        },
        updateQuery(prevResult, { fetchMoreResult }) {
          const newEdges = fetchMoreResult.postByTopicCollection.edges;
          const pageInfo = fetchMoreResult.postByTopicCollection.pageInfo;
          return newEdges.length
            ? {
                postByTopicCollection: {
                  __typename: prevResult.postByTopicCollection.__typename,
                  edges: [
                    ...prevResult.postByTopicCollection.edges,
                    ...newEdges,
                  ],
                  pageInfo,
                },
              }
            : prevResult;
        },
      });
  };

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
        <Feed loading={loading || hasNextPage} loadingRef={sentryRef} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const client = initializeApollo();

  await client.query({
    query: GET_POSTS_BY_TOPIC,
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
