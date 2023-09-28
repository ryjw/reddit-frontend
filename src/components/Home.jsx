import { useOutletContext } from "react-router-dom";
import DisplayPost from "./DisplayPost";

export default function Home() {
  const { posts, subreddits, user } = useOutletContext();
  return (
    <div>
      {posts.map((post) => {
        if (!post.parentId) {
          return <DisplayPost key={post.id} post={post} />;
        }
      })}
    </div>
  );
}
