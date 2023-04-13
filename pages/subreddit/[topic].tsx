import React from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import Avatar from "@d20/Components/Avatar";
import Postbox from "@d20/Components/Postbox";
import Feed from "@d20/Components/Feed";

interface ParsedTopic extends ParsedUrlQuery {
  topic: string;
}

function Subreddit() {
  const { topic } = useRouter().query as ParsedTopic;

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
        <Feed topic={topic} />
      </div>
    </div>
  );
}

export default Subreddit;