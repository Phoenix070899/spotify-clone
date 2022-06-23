import React, { useEffect } from "react";
import axios from "axios";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import { useStateProvider } from "../StateProvider";
import { reducerCases } from "../Constants";

const PlayerControl = () => {
  const [
    { token, playerState, setShuffle, setRepeat, currentPlaying },
    dispatch,
  ] = useStateProvider();
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data != "") {
      const currentPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artists: response.data.item.artists.map((artist) => artist.name),
        image: response.data.item.album.images[2].url,
      };
      dispatch({
        type: reducerCases.SET_PLAYING,
        currentPlaying,
      });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
    }
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: true,
    });
  };
  const changeState = async (state) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };

  return (
    <div>
      <div className="footer_center flex text-white gap-5 items-center">
        <div className="shuffle hover:text-gray-400 cursor-pointer">
          <ShuffleRoundedIcon />
        </div>
        <div
          onClick={() => changeTrack("previous")}
          className="previous hover:text-gray-400 cursor-pointer"
        >
          <SkipPreviousRoundedIcon className="icon" />
        </div>
        <div className="state hover:text-gray-400 cursor-pointer scale-[1.5]">
          {!playerState ? (
            <PlayCircleRoundedIcon onClick={() => changeState("play")} />
          ) : (
            <PauseCircleFilledRoundedIcon
              onClick={() => changeState("pause")}
            />
          )}
        </div>
        <div
          onClick={() => changeTrack("next")}
          className="next hover:text-gray-400 cursor-pointer"
        >
          <SkipNextRoundedIcon className="icon" />
        </div>
        <div className="repeat hover:text-gray-400 cursor-pointer">
          <RepeatRoundedIcon />
        </div>
      </div>
    </div>
  );
};

export default PlayerControl;
