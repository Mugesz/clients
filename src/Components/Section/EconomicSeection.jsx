import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const EconomicSection = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${config.Api}/economicsnews/getAllNews`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`${config.Api}/economicsnews/deleteNews/${id}`);
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

  if (data.length === 0) {
    return <h1>...Loading</h1>;
  }

  return (
    <div ref={componentRef} className="container mt-5 mb-5">
      <div className="text-center mb-3">
        <b className="display-6 text-white">
          <img
            src="https://png.pngtree.com/thumb_back/fw800/background/20230907/pngtree-more-economic-news-from-hong-kong-image_13348332.jpg"
            alt=""
            className="rounded me-3"
            height="100px"
            width="100px"
          />
          ECONOMICS NEWS{" "}
          <Link to={"/economicsNews"}>
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#ffffff" }}
            />
          </Link>
        </b>
      </div>

      <div className="d-flex gap-3 justify-content-center">
        <div className="card-group">
          {data.map((item, index) => (
            <div
              key={index}
              className={`card mb-3 bg-transparent border-light text-white ${isVisible ? 'slide-in' : ''}`}
            >
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <u>{item.title}</u>
                </h5>
                <p className="card-text">{item.description}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteNews(item._id)}
                  style={{
                    color: "#ffffff",
                    background: "none",
                    border: "none",
                  }}
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

export default EconomicSection;
