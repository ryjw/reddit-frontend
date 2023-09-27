import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function CreatePost() {
  const { token, subreddits } = useOutletContext();
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [subreddit, setSubreddit] = useState();

  return !token ? <h1>Please log in to post</h1> : <></>;
}
