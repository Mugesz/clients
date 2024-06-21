import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const SportsAndWorldNews = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);

  const fetchSportsNews = async () => {
    try {
      const response = await axios.get(`${config.Api}/sportsnews/getAllNews`);
      setSportsNews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWorldNews = async () => {
    try {
      const response = await axios.get(`${config.Api}/worldnews/getAllNews`);
      setWorldNews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSportsNews = async (id) => {
    try {
      await axios.delete(`${config.Api}/sportsnews/deleteNews/${id}`);
      alert("Successfully deleted sports news");
      fetchSportsNews();
    } catch (error) {
      console.log(error);
      alert("Failed to delete sports news");
    }
  };

  const deleteWorldNews = async (id) => {
    try {
      await axios.delete(`${config.Api}/worldnews/deleteNews/${id}`);
      alert("Successfully deleted world news");
      fetchWorldNews();
    } catch (error) {
      console.log(error);
      alert("Failed to delete world news");
    }
  };

  useEffect(() => {
    fetchSportsNews();
    fetchWorldNews();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-3">
        <b className="display-6 text-white">
          <img
            src="https://img.freepik.com/free-photo/golf-course-wallpapers-that-are-high-definition_1340-43300.jpg"
            alt=""
            className="rounded me-3"
            height="100px"
            width="100px"
          />
          SPORTS & WORLD NEWS{" "}
          <Link to="/sportsNews">
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#ffffff", marginLeft: "10px" }}
            />
          </Link>
        </b>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3 bg-transparent border-light text-white">
            <div className="card-header">Sports News</div>
            <div className="card-body">
              {sportsNews.map((item, index) => (
                <div key={index} className="text-center mb-4">
                  <h5 className="card-title">
                    <u>{item.title}</u>
                  </h5>
                  <p className="card-text">{item.description}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSportsNews(item._id)}
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
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-transparent border-light text-white">
            <div className="card-header">World News</div>
            <div className="card-body">
              {worldNews.map((item, index) => (
                <div key={index} className="text-center mb-4">
                  <h5 className="card-title">
                    <u>{item.title}</u>
                  </h5>
                  <p className="card-text">{item.description}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteWorldNews(item._id)}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsAndWorldNews;
