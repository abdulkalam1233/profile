import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import DarkMode from "./DarkMode";

function Navbar() {
  return (
    <nav className="text-black dark:text-white flex justify-between items-center ml-[20rem] sm:ml-[2rem] md:ml-[6rem] mr-[20rem] md:mr-[6rem] sm:mr-[2rem]">
      <div className="flex">
        <Link className="text-3xl font-bold" to="/">
          AK
        </Link>
      </div>
      <ul className={"flex space-x-5 justify-end"}>
        <li className="cursor-pointer">
          <Link to="blogs">Blogs</Link>
        </li>
        <li className="cursor-pointer">
          <Link to="search">Search</Link>
        </li>
        <DarkMode />
      </ul>
    </nav>
  );
}

export default Navbar;
