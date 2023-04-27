type Comment = {
  id: number;
  username: string;
  text: string;
  post_id: number;
  created_at: DateTime;
};

type Subreddit = {
  topic: string;
  id: number;
  created_at: string;
};

type User = {
  id: number;
  username: string;
  surname: string;
  firstname: string;
  created_at: string;
};

type Vote = {
  id: number;
  username: string;
  upvote: boolean;
  post_id: number;
  created_at: DateTime;
};
