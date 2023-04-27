import React, { SyntheticEvent, useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { PostAttributesFragment } from "@d20/generated/graphql";
import { ADD_VOTE } from "@d20/graphql/mutations";
import { GET_VOTES_BY_POST_ID } from "@d20/graphql/queries";
import TimeAgo from "react-timeago";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";

interface Props {
  post: PostAttributesFragment;
}

function PostCard({ post }: Props) {
  const { data: session } = useSession();
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const [vote, setVote] = useState<boolean | null>();
  const [votes, setVotes] = useState(post.votes);

  useEffect(() => {
    const isUpvote = votes?.find(
      (vote) => vote === session?.user?.name
    )?.upvote;

    setVote(isUpvote);
  }, [votes, session]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [
      {
        query: GET_VOTES_BY_POST_ID,
        variables: {
          post_id: post.id,
        },
      },
    ],
    fetchPolicy: "no-cache",
    onQueryUpdated: async (obervableQuery) => {
      const {
        data: { getVotesByPostId },
      } = await obervableQuery.refetch();
      setVotes(getVotesByPostId);
    },
  });

  const displayVotes = () => {
    if (!votes || !votes.length) return 1;

    const totalVotes = votes.reduce(
      (total, vote) => (vote?.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (totalVotes === 0) return votes[0]?.upvote ? 1 : -1;

    return totalVotes;
  };

  const upVote = async (e: SyntheticEvent, isUpvote: boolean) => {
    e.preventDefault();

    if (!session) {
      console.log("Log in to upvote");
      return;
    }

    if (isUpvote && vote) {
      console.log("You may only upvote once");
      return;
    }

    if (!isUpvote && vote === false) {
      console.log("You may only downvote once");
      return;
    }

    await addVote({
      variables: {
        post_id: post.id,
        upvote: isUpvote,
        username: session?.user.name,
      },
    });

    // const {
    //   data: { getVotesByPostIdAndUsername },
    // } = await getUserVotes({
    //   variables: {
    //     post_id: post.id,
    //     username: session?.user.name!,
    //   },
    //   fetchPolicy: "no-cache",
    // });

    // const votes: Vote[] = getVotesByPostIdAndUsername;

    // if (!votes.length) {
    //   await addVote({
    //     variables: {
    //       post_id: post.id,
    //       username: session?.user.name!,
    //       upvote: isUpvote,
    //     },
    //   });
    // } else if (isUpvote && votes[0]?.upvote) {
    //   await deleteVote({
    //     variables: {
    //       id: votes[0].id,
    //     },
    //   });
    // } else if (!isUpvote && !votes[0]?.upvote) {
    //   await deleteVote({
    //     variables: {
    //       id: votes[0].id,
    //     },
    //   });
    // } else if (votes.length) {
    //   await deleteVote({
    //     variables: {
    //       id: votes[0].id,
    //     },
    //   });

    //   await addVote({
    //     variables: {
    //       post_id: post.id,
    //       username: session?.user.name!,
    //       upvote: isUpvote,
    //     },
    //   });
    // }
  };

  const loadSubredditPage = (e: SyntheticEvent) => {
    e.preventDefault();
    const href = `/subreddit/${post.subreddit_topic}`;
    Router.push(href);
  };

  return (
    <Link passHref href={`/post/${post.id}`}>
      <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={(e) => upVote(e, true)}
            className="voteButtons cursor-pointer hover:text-red-400"
          />
          <p className="text-xs font-bold text-black">{displayVotes()}</p>
          <ArrowDownIcon
            onClick={(e) => upVote(e, false)}
            className="voteButtons cursor-pointer hover:text-blue-400"
          />
        </div>
        <div className="p-3 pb-1">
          <div className="flex items-center space-x-2">
            <Avatar seed={post?.subreddit_topic!} />
            <p className="text-xs text-gray-400">
              <span
                onClick={(e) => loadSubredditPage(e)}
                className="font-bold text-black hover:text-blue-400 hover:underline"
              >
                r/{post.subreddit_topic}
              </span>

              <span>
                • Posted by u/{post.username}{" "}
                {hasMounted ? (
                  <TimeAgo date={post.created_at} autoPlay={false} />
                ) : (
                  "Loading..."
                )}
              </span>
            </p>
          </div>

          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          {post.image && <img className="w-full" src={post.image} alt="" />}
          {/* Footer */}
          <div className="flex space-x-4 text-gray-400 ">
            <div className="postButtons">
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
              {/* <p>{post.comments.length} Comments</p> */}
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
