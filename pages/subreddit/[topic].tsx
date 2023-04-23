import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { addApolloState, initializeApollo } from "@d20/client";
import { GET_POSTS_BY_TOPIC } from "@d20/graphql/queries";
import { allPostsVar } from "@d20/reactivities/allPosts";

import Avatar from "@d20/Components/Avatar";
import Postbox from "@d20/Components/Postbox";
import Feed from "@d20/Components/Feed";

type Params = {
  topic: string;
};

type Props = {
  posts: Post[];
  topic: string;
};

const Subreddit: NextPage<Props> = ({ posts, topic }) => {
  useEffect(() => {
    allPostsVar(posts);
  }, [posts]);

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
        <Feed />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const client = initializeApollo({} as unknown as null);

  const { data } = await client.query({
    query: GET_POSTS_BY_TOPIC,
    variables: {
      topic: params!.topic,
    },
  });

  const posts: Post[] = data.getPostsByTopic;

  const documentProps = addApolloState(client, {
    props: {
      posts,
      topic: params!.topic,
    },
  });

  return { props: documentProps.props };
};

export default Subreddit;
