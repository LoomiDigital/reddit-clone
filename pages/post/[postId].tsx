import { GetServerSideProps } from "next";
import { addApolloState, initializeApollo } from "@d20/client";
import {
  GetPostByIdDocument,
  PostAttributesFragment,
} from "@d20/generated/graphql";

import PostCard from "@d20/Components/PostCard";

type Params = {
  postId: string;
};

type Props = {
  post: PostAttributesFragment;
};

function PostPage({ post }: Props) {
  return (
    <div className="mx-auto my-7 mt-5 max-w-5xl space-y-4">
      <PostCard post={post} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const client = initializeApollo({} as unknown as null);
  const {
    data: { getPostById },
  } = await client.query({
    query: GetPostByIdDocument,
    variables: {
      id: params!.postId,
    },
  });

  const post: PostAttributesFragment = getPostById;
  const documentProps = addApolloState(client, {
    props: {
      post,
    },
  });

  return { props: documentProps.props };
};

export default PostPage;
