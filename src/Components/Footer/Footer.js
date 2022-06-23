import React, { useEffect } from "react";
import "./Footer.css";
import CurrentTrack from "../CurrentTrack/CurrentTrack";
import PlayerControl from "../PlayerControl/PlayerControl";
import VolumnControl from "../PlayerControl/VolumnControl";

const Footer = () => {
  return (
    <div className="footer fixed flex items-center justify-between p-3 inset-x-0 bottom-0 h-20 bg-gray-900 border-t border-slate-700">
      <div className="footer_left w-4/12 flex justify-start">
        <CurrentTrack />
      </div>
      <div className="footer_center w-4/12 flex justify-center">
        <PlayerControl />
      </div>
      <div className="footer_right w-4/12 flex justify-end">
        <VolumnControl />
      </div>
    </div>
  );
};

export default Footer;
