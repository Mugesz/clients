import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const Sportsection = () => {
  const [data, setData] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${config.Api}/sportsnews/getAllNews`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`${config.Api}/sportsnews/deleteNews/${id}`);
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
        <b>
          SPORTSNEWS{" "}
          <Link to={"/sportsNews"}>
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
          <div className="card">
            {data.map((item, index) => (
              <div key={index} className="card-body text-center">
                <div>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <small>
                    <button  className="btn btn-danger" onClick={()=>deleteNews(item._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{"--fa-primary-color": "#0052e0", "--fa-secondary-color": "#0050db",}} />
                    </button>
                  </small>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sportsection;
