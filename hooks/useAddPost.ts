import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import {
  PostAttributesFragmentDoc,
  useAddPostMutation,
  useAddSubredditMutation,
  useAddVoteMutation,
  useGetSubredditByTopicLazyQuery,
} from "@d20/generated/graphql";

import { newPostIncoming } from "@d20/reactivities/posts";
import { toast } from "react-hot-toast";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

export const useAddPost = (subreddit?: string) => {
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

  const submitPost = handleSubmit(async (formData) => {
    const notification = toast.loading("Creating post...");

    try {
      newPostIncoming(true);

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
                        id: -1,
                        post_id: addPostData?.insertPost?.id!,
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
        onCompleted: async (data) => {
          addVote({
            variables: {
              post_id: data?.insertPost?.id!,
              username: session?.user.name!,
              upvote: true,
            },
          });

          newPostIncoming(false);
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

  return {
    register,
    submitPost,
    setValue,
    watch,
    errors,
    session,
  };
};
