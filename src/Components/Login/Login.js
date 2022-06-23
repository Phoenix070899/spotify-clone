import React from "react";

const Login = () => {
  // 1. Click Login button
  // 2. Redirect to Spotify login page
  // 3. Redirect to homepage once login

  const handleClick = async () => {
    const api_uri = "https://accounts.spotify.com/authorize";
    const redirect_uri = "https://spotify-clone-ochre-nine.vercel.app/";
    const client_id = "3084998816f14c7888e711298b8adb29";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="login p-10 h-full flex flex-col items-center justify-center bg-black">
      <img
        className="p-10"
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
        alt="Spotify Logo"
      />
      <button
        onClick={handleClick}
        className="px-8 py-5 text-base bg-green-500 rounded-full text-white font-bold"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
