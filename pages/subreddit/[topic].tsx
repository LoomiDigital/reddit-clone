import { GetServerSideProps, NextPage } from "next";

import { useGetLazyPostsByTopic } from "@d20/hooks/useGetLazyPostsByTopic";
import { addApolloState, initializeApollo } from "@d20/graphql/client";
import { GetPostsByTopicDocument, PostEdge } from "@d20/generated/graphql";

import Avatar from "@d20/Components/Avatar";
import PostBox from "@d20/Components/Postbox";
import Feed from "@d20/Components/Feed";

type Props = {
  topic: string;
};

const NUMBER_OF_POSTS = 4;

const Subreddit: NextPage<Props> = ({ topic }) => {
  const { posts, loading, hasNextPage, sentryRef } = useGetLazyPostsByTopic(
    topic,
    NUMBER_OF_POSTS
  );

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
        <PostBox subreddit={topic} />
        {posts?.length && (
          <Feed
            posts={posts}
            loading={loading || hasNextPage}
            loadingRef={sentryRef}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const client = initializeApollo({});

  await client.query({
    query: GetPostsByTopicDocument,
    variables: {
      first: NUMBER_OF_POSTS,
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
