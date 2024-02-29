import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const EconomicSection = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="container mt-3">
      <div className="text-center mb-3">
        <b>
          ECONOMICS NEWS{" "}
          <Link to={"/economicsNews"}>
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#000000" }}
            />
          </Link>
        </b>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card-group">
            {data.map((item, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <small>
                    <button className="btn btn-danger" onClick={()=>deleteNews(item._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{"--fa-primary-color": "#0052e0", "--fa-secondary-color": "#0050db",}} />
                    </button>
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <img
            className="img-fluid"
            src="https://c1.wallpaperflare.com/preview/610/200/858/refugees-economic-migrants-financial-equalization-help.jpg"
            alt=""
            height="300px"
            width="200px"
          />
        </div>
      </div>
    </div>
  );
};

export default EconomicSection;
