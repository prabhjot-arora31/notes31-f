import React from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h3 className="text-center mb-4 mt-4">Login</h3>
      <Login />
      <div
        style={{ width: "100%" }}
        className="d-flex mt-4 justify-content-center align-items-center w-100 flex-column"
      >
        <p style={{ margin: 0 }}>Not registered?</p>
        <Link to="/notes-app-31/" className="btn btn-secondary my-2">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
