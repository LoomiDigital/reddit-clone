import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";

import Avatar from "./Avatar";
import { log } from "console";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function Postbox() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);

  const submitPost = handleSubmit(async (formData) => {
    console.log("formData", formData);
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
              ? "Create a post by entering a title!"
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
