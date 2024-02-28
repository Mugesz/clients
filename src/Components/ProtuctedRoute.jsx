import React from "react";
import Navbar from "./Navbar";
import AllNews from "./AllNews";

const ProtuctedRoute = ({ logout, userData }) => {
  return (
    <>
      <Navbar logout={logout} userData={userData} />
      <AllNews />
    </>
  );
};

export default ProtuctedRoute;
