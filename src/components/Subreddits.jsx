import { NavLink } from "react-router-dom";

export default function Subreddits({ subreddits }) {
  return (
    <div>
      <NavLink to={"createsubreddit"}>Create Subreddit</NavLink>
      <ul>
        {subreddits.map((subreddit) => {
          return (
            <li key={subreddit.id}>
              <NavLink to={`${subreddit.name}`}>{subreddit.name}</NavLink>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
