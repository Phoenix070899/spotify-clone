import React, { useEffect } from "react";
import { useStateProvider } from "../StateProvider";
import axios from "axios";
import { reducerCases } from "../Constants";
import { msToTimeLong, msToTimeShort } from "../convertTime";

const SelectedPlaylist = () => {
  const [{ token, selectedPlaylistId, selectedPlaylist, userInfo }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const durationArray = response.data.tracks.items.map((track) => {
        return track.track.duration_ms;
      });
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        duration: msToTimeLong(
          durationArray.reduce((initial, acc) => {
            return initial + acc;
          }, 0)
        ),
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({
        type: reducerCases.SET_PLAYLIST,
        selectedPlaylist,
      });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };
  return (
    <div className="body basis-11/12 w-full px-5 pt-24">
      {selectedPlaylist && (
        <div className="playlist text-white flex flex-col gap-10">
          <div className="playlist-header w-full flex gap-5 items-end font-semibold">
            <div className="image w-3/12 max-w-xs min-w-[200px] drop-shadow-xl">
              <img className="" src={selectedPlaylist.image} alt="" />
            </div>
            <div className="detail">
              <span className="type text-neutral-400">PLAYLISTS</span>
              <h1 className="title text-8xl py-5 font-bold">
                {selectedPlaylist.name}
              </h1>
              <p className="description font-light text-xs text-neutral-400 py-3">
                {selectedPlaylist.description}
              </p>
              <span className="playlist-info text-base">
                <span className="user">
                  {userInfo.userName} - {selectedPlaylist.tracks.length} songs,
                </span>
                <span className="font-light text-sm">
                  {" "}
                  {selectedPlaylist.duration}
                </span>
              </span>
            </div>
          </div>
          <div className="playlist-body flex flex-col gap-5 text-sm h-full">
            <ul className="flex flex-col gap-5 text-base font-bold">
              <li className="header flex items-center gap-5">
                <span className="w-1/12 flex justify-center">#</span>
                <span className="w-6/12">TITLE</span>
                <span className="w-3/12">ALBUM</span>
                <span className="w-3/12 flex justify-end pr-8">DURATION</span>
              </li>
            </ul>
            <ul className="flex flex-col">
              {selectedPlaylist.tracks.map((track, index) => {
                return (
                  <li
                    onClick={() =>
                      playTrack(
                        track.id,
                        track.name,
                        track.artists,
                        track.image,
                        track.context_uri,
                        track.track_number
                      )
                    }
                    key={index}
                    className="flex items-center py-4 gap-5 rounded cursor-pointer hover:bg-black"
                  >
                    <span className="w-1/12 flex justify-center">
                      {index + 1}
                    </span>
                    <div className="track-content flex w-6/12 gap-3 items-center">
                      <img
                        className="rounded w-14 min-w-12"
                        src={track.image}
                        alt=""
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-base">
                          {track.name}
                        </span>
                        <span className="text-xs">
                          {track.artists.join(", ")}
                        </span>
                      </div>
                    </div>
                    <span className="w-3/12">{track.album}</span>
                    <span className="w-3/12 flex justify-end pr-8">
                      {msToTimeShort(track.duration)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedPlaylist;
