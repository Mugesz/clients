import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const CrimeSection = () => {
  const [data, setData] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${config.Api}/crimenews/getAllNews`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`${config.Api}/crimenews/deleteNews/${id}`);
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

  if (data.length === 0) {
    return <h1>...Loading</h1>;
  }

  return (
    <div className="container top-crime">
      <div className="text-center">
        <b className="display-6 text-white">
          <img
            src="https://images.news18.com/ibnlive/uploads/2022/08/crime-in-india-166185841216x9.jpg"
            alt=""
            className="rounded me-3"
            height="80px"
            width="100px"
          />
          CRIME NEWS{" "}
          <Link to="/crimeNews">
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
            <div className="card mb-5 mt-5 bg-transparent border-light text-white">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <u>{item.title}</u>
                </h5>
                <p className="card-text">{item.description}</p>

                <button
                  className="btn btn-danger"
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
                <hr className="bg-light" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrimeSection;
