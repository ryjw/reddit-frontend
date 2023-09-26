import { useOutletContext, useParams } from "react-router-dom";
import NotFound from "../components/NotFound.jsx";
import CreatePost from "./CreatePost.jsx";
import DisplayPost from "./DisplayPost.jsx";

export default function Subreddit() {
  const { posts, subreddits } = useOutletContext();
  // get the name of the path
  const { subredditName } = useParams();

  // find the correct subreddit object from the array of subreddits
  const subreddit = subreddits.find(
    (subreddit) => subredditName === subreddit.name
  );
  // filter the posts according to subreddit
  const filteredPosts = posts.filter(
    (post) => post.subredditId === subreddit.id
  );
  console.log(filteredPosts);

  return subreddit ? (
    <div>
      <CreatePost />
      {filteredPosts.map((post) => {
        if (!post.parentId) {
          return <DisplayPost post={post} />;
        }
      })}
    </div>
  ) : (
    <NotFound />
  );
}
