import React, { useEffect, useRef } from "react";
import { MdOutlineClear } from "react-icons/md";

function Search() {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchRef]);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4 mb-4 text-2xl font-bold">Search Blogs</div>
      <div className="flex items-center border-2 pr-2 border-blue-500">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search.."
          className="p-2 w-[20rem] sm:w-[10rem] focus:outline-none"
        />
        <MdOutlineClear
          onClick={() => {
            if (searchRef.current) {
              searchRef.current.value = "";
            }
          }}
          className={"cursor-pointer"}
        />
      </div>
      <div className="text-red-500">Note: Work in progress</div>
    </div>
  );
}

export default Search;
