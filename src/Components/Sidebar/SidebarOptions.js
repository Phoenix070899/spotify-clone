import React from "react";

function SidebarOption({ option = "test", Icon }) {
  return (
    <div className="sidebarOption py-2 flex items-center gap-2 hover:font-bold cursor-pointer">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{option}</h4> : <p>{option}</p>}
    </div>
  );
}

export default SidebarOption;
