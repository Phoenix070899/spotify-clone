import React, { useEffect } from "react";
import "./Body.css";
import SelectedPlaylist from "../SelectedPlaylist/SelectedPlaylist";
import SelectedPlaylistPage from "../../Page/SelectedPlaylistPage";
import { Routes, Route } from "react-router-dom";
import Home from "../../Page/Home";
import Search from "../../Page/Search";
import Library from "../../Page/Library";

const Body = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/home" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/library" element={<Library />}></Route>
      </Routes>
      <SelectedPlaylistPage />
    </div>
  );
};

export default Body;
