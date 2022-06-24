import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../Components/StateProvider";
import { reducerCases } from "../Components/Constants";

const Home = () => {
  const [{ token, newReleaseAlbums }, dispatch] = useStateProvider();
  useEffect(() => {
    const getNewRelease = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data.albums;
      const newReleaseAlbums = items.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.images[1].url,
        artists: item.artists.map((artist) => artist.name),
      }));
      dispatch({
        type: reducerCases.SET_NEW_ALBUM,
        newReleaseAlbums: newReleaseAlbums,
      });
    };
    getNewRelease();
  }, [token, dispatch, newReleaseAlbums]);

  return (
    <div className="px-5">
      <div className="new-release-albums">
        <ul className="flex flex-col text-white">
          <h3 className="font-bold text-xl mb-3">New Release Albums</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {newReleaseAlbums?.map((album, index) => {
              return (
                <li
                  className="flex flex-col bg-slate-700/30 rounded p-3 "
                  key={index}
                >
                  <img className="rounded mb-3" src={album.image} alt="" />
                  <span className="text-sm font-bold truncate mb-2">
                    {album.name}
                  </span>
                  <span className="text-xs">{album.artists.join("")}</span>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Home;
