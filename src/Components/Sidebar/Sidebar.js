import React from "react";
import "./Sidebar.css";
import { useStateProvider } from "../StateProvider";
import SidebarOptions from "./SidebarOptions";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import Playlists from "../Playlists/Playlists";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [{ playlists }, dispatch] = useStateProvider();
  return (
    <div className="flex flex-col basis-3/12 bg-black text-white p-8 pb-50">
      <img
        className="w-6/12"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
        alt=""
      />
      <ul className="pt-5 text-sm font-semibold">
        <Link to="/home">
          <li>
            <SidebarOptions Icon={HomeRoundedIcon} option="Home" />
          </li>
        </Link>
        <Link to="/search">
          <li>
            <SidebarOptions Icon={SearchRoundedIcon} option="Search" />
          </li>
        </Link>
        <Link to="/library">
          <li>
            <SidebarOptions Icon={VideoLibraryRoundedIcon} option="Library" />
          </li>
        </Link>
      </ul>
      <hr className="border-neutral-600 my-5" />

      <ul className="playlists pb-14 text-xs overflow-scroll">
        <h5 className="font-bold text-sm pb-2">My playlists</h5>
        <Playlists />
      </ul>
    </div>
  );
};

export default Sidebar;
