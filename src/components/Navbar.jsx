import { NavLink } from "react-router-dom";
import Subreddits from "./Subreddits";

export default function Navbar({ user }) {
  return (
    <>
      <div>
        <NavLink to={"/"}>Home</NavLink>
        <div id="navbar">
          <NavLink to={"/login"}>Login</NavLink>
          <NavLink to={"/register"}>Register</NavLink>
        </div>
      </div>
    </>
  );
}
