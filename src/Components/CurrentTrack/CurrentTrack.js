import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../StateProvider";
import { reducerCases } from "../Constants";

const CurrentTrack = () => {
  const [{ token, currentPlaying, playerState }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentPlaying = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data != "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
          isPlaying: response.data.is_playing,
        };
        dispatch({
          type: reducerCases.SET_PLAYING,
          currentPlaying,
        });
        if (currentPlaying.isPlaying) {
          dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: currentPlaying.isPlaying,
          });
        }
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    };
    getCurrentPlaying();
  }, [token, dispatch, playerState]);
  return (
    <div className="current-track">
      {currentPlaying && (
        <div className="flex text-white items-center gap-3">
          <img className="w-14" src={currentPlaying.image} alt="" />
          <div className="current-track-info flex flex-col text-sm">
            <span className="font-bold">{currentPlaying.name}</span>
            <span className="text-xs font-light">
              {currentPlaying.artists.join("")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentTrack;
