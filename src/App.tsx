import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import About from "./components/about/About";
import Blogs from "./components/blogs/Blogs";
import Search from "./components/search/Search";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  );
};

export default App;
