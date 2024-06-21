import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ logout, userData }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light text-light fixed-top mt-0"
      style={{ backgroundColor: "#e8280b" }}
    >
      <div className="container">
        <a className="navbar-brand nav-clr" href="#">
          <b>GOOD NEWS</b>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav"></div>
        <div className="d-flex align-items-center gap-2 justify-content-center me-3">
          <div className="me-3">
            <h4 className="">Welcome</h4>
            <h6>{userData.displayName}</h6>
          </div>
          <div className="mt-0">
            <img
              className="rounded-circle"
              style={{ height: "70px", width: "70px" }}
              src={userData.photoURL}
              alt=""
            />
          </div>
          <div className="">
            <button className="btn btn-light" onClick={logout}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ color: "#262726" }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
