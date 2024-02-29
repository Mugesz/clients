import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const Worldnews = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="container mt-3">
      <div className="text-center mb-3">
        <b className="display-3">
          WORLD NEWS{" "}
          <Link to="/worldNews">
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#000000" }}
            />
          </Link>
        </b>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <img
            src="https://wallpapers.com/images/hd/world-globe-hufe8df2snrioyyp.jpg"
            className=" img-fluid rounded-circle"
            alt=""
            height="400px"
            width="500px"
          />
          <div className="card">
            {data.map((item, index) => (
              <div key={index} className="card-body text-center">
                <h5 className="card-title"><u>{item.title}</u></h5>
                <p className="card-text">{item.description}</p>
                <small>
                  <button  className="btn btn-danger" onClick={() => deleteNews(item._id)}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      style={{
                        "--fa-primary-color": "#0052e0",
                        "--fa-secondary-color": "#0050db",
                      }}
                    />
                  </button>
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worldnews;
