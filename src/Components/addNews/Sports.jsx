import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { config } from '../fetch';

const useSports = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      img: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is mandatory";
      }
      if (!values.description) {
        errors.about = "Task need to be created";
      }
      return errors;
    },
    onSubmit: async (values, formikbag) => {
        try {
            await axios.post(`${config.Api}/sportsnews/create-news`, values);
            alert("Success");
            formikbag.resetForm()
        } catch (error) {
            if (error.response) {
             
                console.error("Server responded with an error:", error.response.data);
                alert("Server responded with an error");
            } else if (error.request) {
              
                console.error("No response received from server:", error.request);
                alert("No response received from server");
            } else {
               
                console.error("Error while setting up the request:", error.message);
                alert("Error while setting up the request");
            }
        }
    },
    
  });

  return formik;
};

const Sports = () => {
  const formik = useSports();

  return (
    <div>
      <div className="container mt-3 shadow p-3 mb-5 rounded">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h3 className="text-center">
              <u>Add Sports News</u>
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="input-container mb-3">
                <label className="form-label" htmlFor="title">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title..."
                  className="form-control input-field"
                  autoComplete="true"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="text-danger">
                  {formik.touched.title && formik.errors.title}
                </span>
              </div>
              <div className="input-container mb-3">
                <label className="form-label" htmlFor="about">
                  Description:
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Task to be done..."
                  className="form-control input-field"
                  autoComplete="true"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="text-danger">
                  {formik.touched.about && formik.errors.about}
                </span>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sports;
