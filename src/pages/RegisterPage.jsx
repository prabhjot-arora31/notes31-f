import React, { useEffect, useState } from "react";
import Register from "../components/Register";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const USERID = useSelector((state) => state.SetIdReducer);
  const navigate = useNavigate();
  useEffect(() => {
    //console.log(document.cookie);
    if (localStorage.getItem("user-id")) {
      // var cookie = decodeURIComponent(document.cookie);
      //var userrId = cookie.substring(15, cookie.length - 1);
      navigate(`/home/${localStorage.getItem("user-id")}`);
    }
  }, []);
  return (
    <div>
      <h3 className="text-center mb-4 mt-4">Register</h3>
      <Register />
      <div
        style={{ width: "100%" }}
        className="d-flex mt-4 justify-content-center align-items-center w-100 flex-column"
      >
        <p style={{ margin: 0 }}>Already registered?</p>
        <Link to="/login" className="btn btn-secondary my-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
