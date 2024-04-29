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
  if(data.length === 0){
    return <h1>...Loading</h1>
  }
  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-3">
        <b className="display-3">
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
              style={{ color: "#000000" }}
            />
          </Link>
        </b>
      </div>

      <div className="d-flex">
        <div className="justify-content-center gap-5">
          <div className="card-group">
            {data.map((item, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title mb-4"><u>{item.title}</u></h5>
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
      </div>
    </div>
  );
};

export default EconomicSection;
