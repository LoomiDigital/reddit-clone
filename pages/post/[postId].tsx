import { GetServerSideProps } from "next";
import { addApolloState, initializeApollo } from "@d20/graphql/client";
import {
  GetPostDocument,
  PostAttributesFragment,
} from "@d20/generated/graphql";

import PostCard from "@d20/Components/PostCard";
import Comments from "@d20/Components/Comments";

type Params = {
  postId: string;
};

type Props = {
  post: PostAttributesFragment;
};

function PostPage({ post }: Props) {
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <PostCard post={post} />
      <Comments post={post} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const client = initializeApollo({});
  const {
    data: { getPost },
  } = await client.query({
    query: GetPostDocument,
    variables: {
      id: params!.postId,
    },
  });

  const post: PostAttributesFragment = getPost;

  const documentProps = addApolloState(client, {
    props: {
      post,
    },
  });

  return { props: documentProps.props };
};

export default PostPage;
