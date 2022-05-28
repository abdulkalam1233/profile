import React from "react";
import Navbar from "../navbar/Navbar";
import { ThemeProvider } from "../../utils/theme.context";
import { Outlet } from "react-router-dom";

function Home() {
  let theme = localStorage.getItem("theme");
  if (
    theme == "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  } else {
    theme = "light";
  }
  return (
    <div className="mt-2 flex flex-col w-[100%]">
      <ThemeProvider value={theme}>
        <Navbar />
      </ThemeProvider>
      <main className="dark:text-white self-center pt-[5rem]">
        <Outlet />
      </main>
      <footer className="flex text-[0.7rem] items-center self-center dark:text-white fixed bottom-10">
        &copy; 2022 <span className="ml-2 underline">Abdul Kalam</span>
      </footer>
    </div>
  );
}

export default Home;
