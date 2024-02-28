import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ logout, userData }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light text-light fixed-top mt-0" style={{ backgroundColor: '#e8280b' }}>
      <div className="container">
        <a className="navbar-brand nav-clr" href="#">
          <b>GOOD NEWS</b>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav"></div>
        <div className="d-flex me-3">
          <div className="me-3">
            <h1>Welcome</h1>
            <h5>{userData.displayName}</h5>
            <button className="btn btn-light" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#262726" }} /></button>
          </div>
          <div className="mt-0">
            <img className="rounded-circle" style={{ height: "100px", width: "100px" }} src={userData.photoURL} alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
