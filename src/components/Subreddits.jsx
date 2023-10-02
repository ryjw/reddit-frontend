import { NavLink } from "react-router-dom";
import DeleteSubreddit from "./DeleteSubreddit";

export default function Subreddits({
  subreddits,
  fetchPosts,
  user,
  token,
  fetchSubreddits,
}) {
  return (
    <div>
      <NavLink className="create-subreddit" to={"createsubreddit"}>
        <h3>Create Subreddit</h3>
      </NavLink>
      <ul className="list">
        {subreddits.map((subreddit) => {
          return (
            <li className="flex" key={subreddit.id}>
              <NavLink to={`${subreddit.name}`}>{subreddit.name}</NavLink>
              {subreddit.userId === user.id && (
                <DeleteSubreddit
                  className
                  subreddit={subreddit}
                  user={user}
                  fetchPosts={fetchPosts}
                  token={token}
                  fetchSubreddits={fetchSubreddits}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
