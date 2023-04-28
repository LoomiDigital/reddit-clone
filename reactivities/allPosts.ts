import { makeVar } from "@apollo/client";
import { PostEdge } from "@d20/generated/graphql";

export const allPostsVar = makeVar<PostEdge[]>([]);
