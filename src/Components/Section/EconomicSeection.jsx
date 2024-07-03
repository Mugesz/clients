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
      await axios.delete(`${config.Api}/economicsnews/getAllNews/${id}`);
      alert("Successfully deleted news");
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
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

  useEffect(() => {
    console.log(data); // Log data to check if it is updated correctly
  }, [data]);

  return (
    <div
      ref={componentRef}
      className={`container mt-3 ${isVisible ? "slide-in-from-bottom" : ""}`}
    >
      <div className="text-center mb-3">
        <b className="display-4 text-white">
          ECONOMIC NEWS{" "}
          <Link to="/cinemaNews">
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#ffffff" }}
            />
          </Link>
        </b>
      </div>

      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-5 bg-transparent border-light text-white">
              <div className="card-body">
                <h5 className="card-title">
                  <u>{item.title}</u>
                </h5>
                <p className="card-text text-white ">{item.description}</p>
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
                <hr className="bg-light" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EconomicSection;
