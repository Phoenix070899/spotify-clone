import React, { useEffect } from "react";
import { useStateProvider } from "../StateProvider";
import axios from "axios";
import { reducerCases } from "../Constants";
import { msToTimeLong, msToTimeShort } from "../convertTime";
import { Routes, Route } from "react-router-dom";
import SelectedPlaylistPage from "../../Page/SelectedPlaylistPage";

const SelectedPlaylist = () => {
  const [{ token, selectedPlaylistId, selectedPlaylist, userInfo }, dispatch] =
    useStateProvider();

  return (
    <div>
      <Routes>
        <Route
          path={"/path/" + selectedPlaylistId}
          element={<SelectedPlaylistPage />}
        ></Route>
      </Routes>
    </div>
  );
};

export default SelectedPlaylist;
