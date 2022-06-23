import React, { useEffect, useRef, useState } from "react";
import "./Spotify.css";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Body/Body";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useStateProvider } from "../StateProvider";
import axios from "axios";
import { reducerCases } from "../Constants";

const Spotify = () => {
  const [{ token, userInfo }, dispatch] = useStateProvider();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyScroll = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        userName: data.display_name,
        userImage: data.images[0].url,
      };
      dispatch({
        type: reducerCases.SET_USER,
        userInfo,
      });
    };
    getUserInfo();
  }, [token, dispatch]);
  return (
    <div className="spotify h-screen">
      <div className="spotify_body flex h-full">
        <Sidebar />
        <div
          className="spotify_body_content flex flex-col w-9/12 bg-gradient-to-t from-black to-gray-800 h-screen overflow-scroll pb-24"
          ref={bodyRef}
          onScroll={bodyScroll}
        >
          <Navbar navBackground={navBackground} />
          <Body headerBackground={headerBackground} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Spotify;
