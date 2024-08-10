import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { thunkLogin } from "../../../redux/session";
import OpenModalMenuItem from "../OpenModalMenuItem";
import LoginFormModal from "../../users/LoginFormModal";
import SignupFormModal from "../../users/SignupFormModal";
import ProfileImageButton from "./ProfileImageButton";

function NavBar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  useEffect(() => {}, [user?.shops?.length]);

  const demoLogin = () =>
    dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      }),
    );

  return (
    <nav className="w-auto h-full m-0 p-0 flex flex-row flex-nowrap justify-end items-center gap-4 list-none text-base/4 md:text-lg/4">
      <NavLink
        to="/products"
        className="w-auto h-full flex justify-center items-center cursor-pointer font-semibold transition-colors hover:text-teal-500"
      >
        Browse Products
      </NavLink>
      {user ? (
        <>
          {user.shops.length /* Prompt shop creation if none exist */ ? (
            <NavLink
              to="/products/new"
              className="w-auto h-full flex justify-center items-center cursor-pointer font-semibold transition-colors hover:text-teal-500"
            >
              Sell Your Gear
            </NavLink>
          ) : (
            <NavLink
              to="/shops/new"
              className="w-auto h-full flex justify-center items-center cursor-pointer font-semibold transition-colors hover:text-teal-500"
            >
              Create a Shop
            </NavLink>
          )}
          <ProfileImageButton user={user} />
        </>
      ) : (
        <>
          <OpenModalMenuItem
            itemText="Log In"
            modalComponent={<LoginFormModal />}
            className="w-auto h-full flex justify-center items-center cursor-pointer font-semibold transition-colors hover:text-teal-500"
          />
          <OpenModalMenuItem
            itemText="Sign Up"
            modalComponent={<SignupFormModal />}
            className="w-auto h-full flex justify-center items-center cursor-pointer font-semibold transition-colors hover:text-teal-500"
          />
          <li
            onClick={demoLogin}
            className="w-auto h-full flex justify-center items-center cursor-pointer font-semibold transition-colors hover:text-teal-500"
          >
            Demo
          </li>
        </>
      )}
    </nav>
  );
}

export default NavBar;
