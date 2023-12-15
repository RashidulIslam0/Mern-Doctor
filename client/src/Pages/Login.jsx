import Link from "antd/es/typography/Link";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  // State variables for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nevigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = {
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        user
      );

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home page");
        localStorage.setItem("token", response.data.data); // Assuming the token is in response.data.data
        nevigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during async action:", error.message);
      toast.error("An error occurred during the action.");
    }
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#222" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Welcome Back
                    </p>

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <div className="text-center">
                      <p>
                        Already have an account?{" "}
                        <NavLink to="/register">Click Here to Register</NavLink>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
