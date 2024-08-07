import React, { useEffect, useState } from "react";
import Register from "../components/Register";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //console.log(document.cookie);
    if (document.cookie.startsWith("user-cookie")) {
      var cookie = decodeURIComponent(document.cookie);
      var userrId = cookie.substring(15, cookie.length - 1);
      navigate(`/notes-app-31/home/${userrId}`);
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
        <Link to="/notes-app-31/login" className="btn btn-secondary my-2">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
