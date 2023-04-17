type Comment = {
  id: number;
  username: string;
  text: string;
  post_id: number;
  created_at: DateTime;
};

type Post = {
  id: number;
  username: string;
  title: string;
  subreddit_id: number;
  subreddit_topic: string;
  image: string;
  created_at: string;
  body: string;
  subreddit: Subreddit[];
  votes: Vote[];
  comments: Comment[];
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
  upvote: Boolean;
  post_id: number;
  created_at: DateTime;
};
