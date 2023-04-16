import { GetStaticPaths, GetStaticProps } from "next";
import client from "@d20/apollo-client";
import { GET_POSTS_BY_TOPIC, GET_SUBREDDITS } from "@d20/graphql/queries";

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

function Subreddit({ posts, topic }: Props) {
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
        <Feed topic={topic} posts={posts} />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { getSubredditList },
  } = await client.query({
    query: GET_SUBREDDITS,
  });

  const paths = getSubredditList.map((subreddit: Subreddit) => ({
    params: {
      topic: subreddit.topic,
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
  const { data } = await client.query({
    query: GET_POSTS_BY_TOPIC,
    variables: {
      topic: params!.topic,
    },
  });

  const posts: Post[] = data.getPostsByTopic;

  return {
    props: {
      posts,
      topic: params!.topic,
    },
  };
};

export default Subreddit;
