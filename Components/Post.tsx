import React from "react";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return <div>{post.body}</div>;
}

export default Post;
