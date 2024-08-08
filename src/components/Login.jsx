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
    setChangeBtnState("Please wait..");
    if (data1.name !== "" && data1.password !== "") {
      console.log(data1.name);
      const { data } = await axios.post(
        "https://notes-app-backend-311299newagain.vercel.app/login",
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
        localStorage.setItem("token", data.token);
        setChangeBtnState("Redirecting");
        setTimeout(() => {
          navigate(`/notes-app-31/home/${data.user}`);
        }, 2000);
        setMessage(data.msg);
      } else {
        setChangeBtnState("Submit");
        // setMessage("Password is incorrect");
        setMessage(data.msg);
      }
    } else {
      setChangeBtnState("Submit");
      setMessage("Please enter all the fields");
    }
  };
  return (
    <div>
      <form
        className="p-4"
        style={{ maxWidth: "400px", margin: "0 auto" }}
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="mb-3 text-center">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email<i class="fa-solid fa-envelope mx-2"></i>
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
        <div className="mb-3 text-center">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
            <i class="fa-solid fa-lock mx-2"></i>
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
        <p
          className="mb-4"
          style={{ color: `${message == "Login success" ? "green" : "red"}` }}
        >
          {message}
        </p>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={changeBtnState == "Submit" ? false : true}
        >
          {changeBtnState}
        </button>
      </form>
    </div>
  );
};

export default Login;
