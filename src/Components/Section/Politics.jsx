import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const Politics = () => {
  const [data, setData] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${config.Api}/politicsnews/getAllNews`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`${config.Api}/politicsnews/deleteNews/${id}`);
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

  if(data.length === 0){
    return <h1>...Loading</h1>
  }

  return (
    <div className="container mt-3">
      <div className="text-center mb-3">
        <b className="display-3">
          Politics{" "}
          <Link to={"/politicsNews"}>
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#000000" }}
            />
          </Link>
        </b>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <img
            className="img-fluid mb-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTalhSf68Co6tQXT1WXbkJdmjImrf9JNydw9w&usqp=CAU"
            alt=""
          />
          <div className="card">
            <div className="card-body">
              {data.map((item, index) => (
                <div key={index}>
                  <h5 className="card-title"><u>{item.title}</u></h5>
                  <p className="card-text">{item.description}</p>
                  <small>
                    <button  className="btn btn-danger" onClick={()=>deleteNews(item._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} style={{"--fa-primary-color": "#0052e0", "--fa-secondary-color": "#0050db",}} />
                    </button>
                  </small>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politics;
