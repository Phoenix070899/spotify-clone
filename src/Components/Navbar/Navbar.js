import React, { useEffect } from "react";
import { useStateProvider } from "../StateProvider";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";

const Navbar = ({ navBackground }) => {
  const [{ userInfo }] = useStateProvider();
  useEffect(() => {
    navBackground
      ? document.getElementById("navbar").classList.add("bg-gray-900")
      : document.getElementById("navbar").classList.remove("bg-gray-900");
  }, [navBackground]);
  return (
    <div
      id="navbar"
      className="navbar text-white flex justify-between items-center p-4 sticky top-0 right-0 left-0 z-50"
    >
      <div className="search_bar flex items-center rounded-full gap-2 px-4 bg-white text-black w-4/12">
        <div className="scale-110">
          <SearchIcon />
        </div>
        <input
          className="bg-transparent text-sm text-black w-full p-2"
          type="text"
          placeholder="Artist, songs, or podcasts"
        />
      </div>
      <div className="avatar">
        <a
          className="flex items-center gap-2 p-2 bg-black rounded-full w-fit"
          href="#"
        >
          <img
            className="w-8 h-fit rounded-full"
            src={userInfo?.userImage}
            alt=""
          />
          <span className="font-semibold text-sm">{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
