import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import ProtuctedRoute from "./ProtuctedRoute";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        setUserData({ displayName, email, photoURL });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Logout = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {
        const { displayName, email, photoURL } = result;
        setUserData({ displayName, email, photoURL });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <div className="mb-3">
        {!isLoggedIn && (
          <button className="login-btn btn btn-danger text-center" onClick={googleLogin}>
            Login with Google <FontAwesomeIcon icon={faGoogle} />
            <img src="https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg" alt="" />
          </button>
        )}
        {isLoggedIn && (
          <ProtuctedRoute logout={Logout} userData={userData} />
        )}
      </div>
    </div>
  );
  
};

export default Login;
