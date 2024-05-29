import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./NavBar.css";

function NavBar() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default NavBar;
