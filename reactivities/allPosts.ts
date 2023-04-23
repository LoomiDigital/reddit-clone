import { makeVar } from "@apollo/client";

export const allPostsVar = makeVar<Post[]>([]);
