import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";
import "./Worldnews.css"; // Import your CSS file with animations

const Worldnews = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${config.Api}/worldnews/getAllNews`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`${config.Api}/worldnews/deleteNews/${id}`);
      alert("Successfully deleted news");
      fetchNews();
    } catch (error) {
      console.log(error);
      alert("Failed to delete news");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const top = componentRef.current.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mt-3">
      <div className="text-center mb-3">
        <b className="display-6 text-white">
          WORLD NEWS{" "}
          <Link to="/worldNews">
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#ffffff" }}
            />
          </Link>
        </b>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <img
            src="https://wallpapers.com/images/hd/world-globe-hufe8df2snrioyyp.jpg"
            className="img-fluid rounded-circle mb-3"
            alt=""
            height="400px"
            width="500px"
          />
          {data.map((item, index) => (
            <div
              key={index}
              ref={componentRef}
              className={`card mb-3 bg-transparent border-light text-white ${isVisible ? 'slide-in' : ''}`}
            >
              <div className="card-body text-center">
                <h5 className="card-title">
                  <u>{item.title}</u>
                </h5>
                <p className="card-text">{item.description}</p>
                <button
                  className="btn"
                  onClick={() => deleteNews(item._id)}
                  style={{ color: "#ffffff", background: "none", border: "none" }}
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{
                      "--fa-primary-color": "#ffffff",
                      "--fa-secondary-color": "#ffffff",
                    }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Worldnews;
