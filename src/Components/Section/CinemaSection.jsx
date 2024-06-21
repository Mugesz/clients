import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../fetch";

const CinemaSection = () => {
  const [data, setData] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${config.Api}/cinemanews/getAllNews`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`${config.Api}/cinemanews/deleteNews/${id}`);
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
    <div className="container mt-3">
      <div className="text-center mb-3">
        <b className="display-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5on7t1U65vc9jBdOCmc225ybno_cqwV9gqw&usqp=CAU"
            alt=""
            className="rounded me-3"
            height="100px"
            width="100px"
          />
          CINEMA NEWS{" "}
          <Link to="/cinemaNews">
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#000000" }}
            />
          </Link>
        </b>
      </div>

      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-5 bg-cinema">
              <div className="card-body">
                <h5 className="card-title">
                  <u>{item.title}</u>
                </h5>
                <p className="card-text">{item.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteNews(item._id)}
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{
                      "--fa-primary-color": "#0052e0",
                      "--fa-secondary-color": "#0050db",
                    }}
                  />
                </button>
                <hr />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaSection;
