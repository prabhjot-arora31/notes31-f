import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data1, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [changeBtnState, setChangeBtnState] = useState("Submit");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "https://backend-f8amcudyr-prabhjotarora31s-projects.vercel.app/login",
      data1,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("returned data while login: ", data);
    setMessage(data.msg);
    if (data.msg == "Login success") {
      setChangeBtnState("Redirecting");
      setTimeout(() => {
        navigate(`/home/${data.user}`);
      }, 3000);
    }
  };
  return (
    <div>
      <form
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setData({ ...data1, email: e.target.value })}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setData({ ...data1, password: e.target.value })}
            name="password"
          />
        </div>
        {/* <div className="mb-3 form-check">
  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
  <label className="form-check-label" for="exampleCheck1">
    Check me out
  </label>
</div> */}
        {message == "Login success" ? (
          <div className="text-success mb-4">{message}</div>
        ) : (
          <div className="text-danger mb-4">{message}</div>
        )}
        <button type="submit" className="btn btn-primary">
          {changeBtnState}
        </button>
      </form>
    </div>
  );
};

export default Login;
