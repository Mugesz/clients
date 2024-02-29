import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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


  return (
    <>
      <div className="container top-crime">
        <div className="text-center">
          <b className="display-3">
            CRIME NEWS{" "}
            <Link to='/crimeNews'>
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
            <div className="card">
              <div className="card-body">
                {data.map((item, index) => (
                  <div key={index}>
                    <h5 className="card-title"><u>{item.title}</u></h5>
                    <p className="card-text">{item.description}</p>
                    
                    <button  className="btn btn-danger" onClick={() => deleteNews(item._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{"--fa-primary-color": "#0052e0", "--fa-secondary-color": "#0050db",}} />
                    </button>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img
              src="https://cdn.pixabay.com/photo/2016/11/27/08/23/internet-1862311_640.jpg"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CrimeSection;
