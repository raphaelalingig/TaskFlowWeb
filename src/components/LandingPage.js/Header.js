import "../../App.css";
import React, { useState, useContext } from "react";
import logopicture from "../../assets/taskflowlogo.png";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import AuthContext from "../Auth/AuthContext";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const { logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decoded = jwtDecode(token);
    var user_id = decoded.user_id;
  }

  return (
    <div className="header">
      <div className="navigation mr-10 mt-2 ">
        <Link to="/" className="logo ml-10">
          <img src={logopicture}></img>
        </Link>
        <div className="navigations-links flex">
          {/* <h2 className="links mr-10 text-lg font-semibold hover:underline cursor-pointer">
            Services
          </h2>
          <h2 className="links mr-10 text-lg font-semibold hover:underline cursor-pointer">
            Feedback
          </h2>
          <h2 className="links mr-10 text-lg font-semibold hover:underline cursor-pointer">
            Contact Us
          </h2> */}
        </div>
        {token === null && (
          <Link
            to="/login"
            className="login"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
