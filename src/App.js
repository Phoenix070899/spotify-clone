import "./App.css";
import Login from "./Components/Login/Login";
import React from "react";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Spotify from "./Components/Spotify/Spotify";
import { useStateProvider } from "./Components/StateProvider";
import { reducerCases } from "./Components/Constants";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateProvider();

  // Run code base on a given condition
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({
          type: reducerCases.SET_TOKEN,
          token,
        });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);

  return <div className="app h-screen">{token ? <Spotify /> : <Login />}</div>;
}

export default App;
