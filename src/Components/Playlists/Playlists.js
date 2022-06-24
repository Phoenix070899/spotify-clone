import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../StateProvider";
import { reducerCases } from "../Constants";
import SidebarOption from "../Sidebar/SidebarOptions";
import { Link } from "react-router-dom";

const Playlists = () => {
  const [{ token, playlists, followedAlbum, selectedPlaylistId }, dispatch] =
    useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items?.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({
        type: reducerCases.SET_PLAYLISTS,
        playlists,
      });
    };
    const getAlbumData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data.playlists;
      const followedAlbum = items?.map(({ name, id }) => {
        return { name, id };
      });

      dispatch({
        type: reducerCases.SET_ALBUM,
        followedAlbum,
      });
    };
    getAlbumData();
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({
      type: reducerCases.SET_PLAYLIST_ID,
      selectedPlaylistId,
    });
  };

  return (
    <div>
      <ul>
        {playlists?.map(({ name, id }) => {
          return (
            <Link to={"/playlist/" + selectedPlaylistId}>
              <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                <SidebarOption option={name} />
              </li>
            </Link>
          );
        })}
      </ul>
      <ul>
        {followedAlbum?.map(({ name, id }) => {
          return (
            <Link to={"/playlist/" + selectedPlaylistId}>
              <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                <SidebarOption option={name} />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Playlists;
