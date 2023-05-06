import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  PostAttributesFragmentDoc,
  useAddPostMutation,
  useAddSubredditMutation,
  useAddVoteMutation,
  useGetSubredditByTopicLazyQuery,
} from "@d20/generated/graphql";

import Avatar from "./Avatar";

type Props = {
  subreddit?: string;
};

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function Postbox({ subreddit }: Props) {
  const { data: session } = useSession();
  const [addPost] = useAddPostMutation();
  const [addVote] = useAddVoteMutation();
  const [addSubreddit] = useAddSubredditMutation();
  const [getSubReddit] = useGetSubredditByTopicLazyQuery();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const submitPost = handleSubmit(async (formData) => {
    const notification = toast.loading("Creating post...");

    try {
      const { data } = await getSubReddit({
        variables: {
          topic: subreddit || formData.subreddit,
        },
        fetchPolicy: "no-cache",
      });

      const subredditExists = data?.getSubredditByTopic;

      const postFields = {
        title: formData.postTitle!,
        body: formData.postBody || "",
        image: formData.postImage || "",
        username: session?.user.name!,
      };

      let newSubreddit = null;

      if (!subredditExists) {
        const { data: addSubredditData } = await addSubreddit({
          variables: {
            topic: formData.subreddit.toLowerCase(),
          },
        });
        newSubreddit = addSubredditData?.insertSubreddit!;
      }

      addPost({
        variables: {
          ...postFields,
          subreddit_id: newSubreddit?.id || subredditExists?.id!,
          subreddit_topic: newSubreddit?.topic || subredditExists?.topic!,
        },
        optimisticResponse(vars) {
          return {
            insertPost: {
              __typename: "Post",
              id: -1,
              title: vars.title,
              body: vars.body,
              image: vars.image,
              username: vars.username,
              votes: [],
              subreddit_id: -1,
              subreddit_topic: vars.subreddit_topic,
              created_at: new Date().toISOString(),
            },
          };
        },
        update: async (cache, { data: addPostData }) => {
          const fieldName = subreddit ? "postsByTopic" : "posts";

          cache.modify({
            fields: {
              [fieldName](existingPosts = {}) {
                const newPostRef = cache.writeFragment({
                  data: {
                    ...addPostData?.insertPost!,
                    votes: [
                      {
                        __typename: "Vote",
                        id: 666,
                        username: session?.user.name!,
                        upvote: true,
                      },
                    ],
                  },
                  fragment: PostAttributesFragmentDoc,
                  fragmentName: "postAttributes",
                });

                return {
                  ...existingPosts,
                  edges: [
                    {
                      __typename: "PostEdge",
                      node: newPostRef,
                      cursor: addPostData?.insertPost?.id!,
                    },
                    ...existingPosts.edges,
                  ],
                };
              },
            },
          });
        },
        onCompleted: (data) => {
          addVote({
            variables: {
              post_id: data.insertPost?.id!,
              username: session?.user.name!,
              upvote: true,
            },
          });
        },
      });

      setValue("postTitle", "");
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("subreddit", "");

      toast.success("Post created!", { id: notification });
    } catch (error) {
      console.log("error", error);
      toast.error("Error creating post!", { id: notification });
    }
  });

  return (
    <form
      className="sticky top-16 z-50 rounded-md border border-gray-300 bg-white p-2"
      onSubmit={submitPost}
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className="w-full flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : "Create a post by entering a title!"
              : "Sign in to create a post"
          }
        />
        <PhotoIcon
          onClick={() => {
            setImageBoxOpen(!imageBoxOpen);
          }}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && "text-blue-500"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          {!subreddit && (
            <div className="flex flex-col py-2">
              <div className="flex items-center px-2">
                <p className="min-w-[90px]">Subreddit:</p>
                <input
                  className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                  {...register("subreddit", { required: true })}
                  type="text"
                  placeholder="i.e. r/nextjs"
                />
              </div>
            </div>
          )}
          {imageBoxOpen && (
            <div className="flex flex-col py-2">
              <div className="flex items-center px-2">
                <p className="min-w-[90px]">Image URL:</p>
                <input
                  className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                  {...register("postImage")}
                  type="text"
                  placeholder="Optional..."
                />
              </div>
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>- Post title is required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>- A subreddit is required</p>
              )}
            </div>
          )}
          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-500 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default Postbox;
