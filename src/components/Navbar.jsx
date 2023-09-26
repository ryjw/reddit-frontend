import { NavLink } from "react-router-dom";
import Subreddits from "./Subreddits";

export default function Navbar({ user }) {
  return (
    <>
      <div id="navbar">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/login"}>Login</NavLink>
        <NavLink to={"/signup"}>Sign Up</NavLink>
        <NavLink to={"/"}>Logout</NavLink>
      </div>
    </>
  );
}
