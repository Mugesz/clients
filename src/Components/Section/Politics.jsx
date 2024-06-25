import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { config } from "../fetch";
import { Link } from "react-router-dom";

const Politics = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${config.Api}/politicsnews/getAllNews`
      );
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

  if (data.length === 0) {
    return <h1 className="text-white">...Loading</h1>;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-4">
        <b className="display-6 text-white">
          <img
            src="https://images.theconversation.com/files/582433/original/file-20240318-22-yg77o7.jpg?ixlib=rb-4.1.0&rect=264%2C13%2C3723%2C1861&q=45&auto=format&w=668&h=324&fit=crop"
            alt=""
            className="rounded me-3"
            height="100px"
            width="100px"
          />
          Politics{" "}
          <Link to={"/politicsNews"}>
            <FontAwesomeIcon
              className="plus"
              icon={faPlus}
              style={{ color: "#ffffff" }}
            />
          </Link>
        </b>
      </div>

      <div className="row justify-content-center">
        {data.map((item, index) => (
          <div
            key={index}
            className={`col-lg-6 col-md-8 col-sm-10 ${isVisible ? 'slide-in' : ''}`}
          >
            <div className="card mb-4 bg-transparent border-light text-white">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <u>{item.title}</u>
                </h5>
                <p className="card-text">{item.description}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteNews(item._id)}
                  style={{
                    color: "#ffffff",
                    background: "none",
                    border: "none",
                  }}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Politics;
