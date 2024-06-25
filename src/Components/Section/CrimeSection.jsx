import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const CrimeSection = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=69ed0fe682d84788b7b2339a351a0a68");
      // Ensure data is an array
      if (response.data && Array.isArray(response.data.articles)) {
        setData(response.data.articles);
      } else {
        console.error("Unexpected response format:", response.data);
      }
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
    fetchNews();
  }, []);

  return (
    <div ref={componentRef} className={`container top-crime ${isVisible ? 'slide-in-from-bottom' : ''}`}>
      <div className="text-center">
        <b className="display-4 text-white">
          {/* <img
            src="https://images.news18.com/ibnlive/uploads/2022/08/crime-in-india-166185841216x9.jpg"
            alt=""
            className="rounded me-3"
            height="80px"
            width="100px"
          /> */}
          TECH NEWS{" "}
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
                <div className="img-div">
                  <img src={item.urlToImage} alt="" style={{height:"250px", width:"100%"}} />
                </div>
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
