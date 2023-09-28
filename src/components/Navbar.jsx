import { NavLink } from "react-router-dom";
import Subreddits from "./Subreddits";

export default function Navbar({ user, token, setToken, setUser }) {
  function handleLogout() {
    setUser("");
    setToken("");
    localStorage.clear();
  }

  return (
    <>
      <div id="navbar">
        <NavLink to={"/"}>Home</NavLink>
        {!token && (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/signup"}>Sign Up</NavLink>
          </>
        )}

        {token && (
          <>
            <div>Welcome {user.username}</div>
            <NavLink to={"/post"}>Create Post</NavLink>
            <NavLink onClick={handleLogout} to={"/"}>
              Logout
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}
