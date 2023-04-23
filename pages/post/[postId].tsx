import { GetServerSideProps } from "next";
import { GET_POST_BY_ID } from "@d20/graphql/queries";
import { addApolloState, initializeApollo } from "@d20/client";

import Post from "@d20/Components/Post";

type Params = {
  postId: string;
};

type Props = {
  post: Post;
};

function PostPage({ post }: Props) {
  return (
    <div className="mx-auto my-7 mt-5 max-w-5xl space-y-4">
      <Post post={post} />
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
    query: GET_POST_BY_ID,
    variables: {
      id: params!.postId,
    },
  });

  const post: Post = getPostById;
  const documentProps = addApolloState(client, {
    props: {
      post,
    },
  });

  return { props: documentProps.props };
};

export default PostPage;
