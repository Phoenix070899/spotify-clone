import React, { useEffect } from "react";
import "./Body.css";
import SelectedPlaylist from "../SelectedPlaylist/SelectedPlaylist";
import { Routes, Route } from "react-router-dom";
import Playlists from "../Playlists/Playlists";

const Body = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Playlists />}>
          Home
        </Route>
        <Route path="/search">Search</Route>
        <Route path="/library">Library</Route>
      </Routes>
    </div>
  );
};

export default Body;
