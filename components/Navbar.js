import React from "react";
import logo from "../public/logo.png";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="flex items-center justify-between max-w-7xl m-auto py-5">
        <img src={logo} alt="logo" />
        <div className="flex items-center gap-11">
          <ul className="flex items-center gap-5">
            <li>Home</li>
            <li>Twitter</li>
            <li>Discord</li>
            <li>Roadmap</li>
          </ul>
          <button>Mint Now</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;