import { NavLink } from "react-router-dom";

import HeaderSearchBar from "./HeaderSearchBar";
import NavBar from "./NavBar";
import CategoryNavBar from "./CategoryNavBar";

function PageHeader() {
  return (
    <>
      <div className="w-full h-[45px] px-4 py-1 flex flex-row flex-nowrap justify-center border-b border-stone-500">
        <div className="container flex flex-row flex-nowrap justify-between">
          <NavLink
            id="site-name"
            to="/"
            className="text-4xl/9 font-bold transition-colors hover:text-teal-300"
          >
            vibrato
          </NavLink>
          <HeaderSearchBar />
          <NavBar />
        </div>
      </div>
      <div className="w-full h-[35px] px-4 py-1 flex flex-row flex-nowrap justify-center border-b border-stone-500">
        <CategoryNavBar />
      </div>
    </>
  );
}

export default PageHeader;
