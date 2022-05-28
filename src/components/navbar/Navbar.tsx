import React from "react";
import logo from "../../assets/logo.png";
import DarkMode from "./DarkMode";

function Navbar() {
  return (
    <nav className="text-black dark:text-white flex justify-between items-center ml-[20rem] sm:ml-[2rem] md:ml-[6rem] mr-[20rem] md:mr-[6rem] sm:mr-[2rem]">
      <div className="flex">
        <span className="text-3xl font-bold">AK</span>
      </div>
      <ul className={"flex space-x-5 justify-end"}>
        <li className="cursor-pointer">Blogs</li>
        <li className="cursor-pointer">Search</li>
        <DarkMode />
      </ul>
    </nav>
  );
}

export default Navbar;
