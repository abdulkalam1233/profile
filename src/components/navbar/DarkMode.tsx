import React, { useContext, useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import ThemeContext from "../../utils/theme.context";

function DarkMode() {
  const theme = useContext(ThemeContext);
  const [isDarkMode, setDarkMode] = useState<boolean>(theme == "dark");

  const handleThemeChange = () => {
    if (isDarkMode) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex items-center">
      {localStorage.getItem("theme") === "dark" ? (
        <BsSun className="cursor-pointer" onClick={() => handleThemeChange()} />
      ) : (
        <FaRegMoon
          className="cursor-pointer"
          onClick={() => handleThemeChange()}
        />
      )}
    </div>
  );
}

export default DarkMode;
