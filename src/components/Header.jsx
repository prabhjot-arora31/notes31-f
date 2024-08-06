import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [logoutState, setLogoutState] = useState("Logout");
  const navigate = useNavigate();
  const location = useLocation();
  const logout = async () => {
    const { data } = await axios
      .post(
        "http://localhost:3001/logout",
        {},
        { withCredentials: true }
      )
      .catch((err) => {
        console.log("Error while logout:", err.message);
      });
    console.log(data);
    if (data == "Success") {
      navigate("/");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Notes App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {location.pathname !== "/" && location.pathname !== "/login" && (
              <button
                style={{ maxWidth: "90px" }}
                onClick={() => {
                  setLogoutState("Logging out");
                  logout();
                }}
                class="btn btn-outline-danger mx-4"
              >
                {logoutState}
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
