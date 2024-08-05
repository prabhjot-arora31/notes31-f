import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetUserData } from "../redux/actions/actions";
const Register = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => {
    console.log(state);
    return state.User;
  });
  const [userData, setUserData] = useState(user);
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(SetUserData(userData));
    setLoading(true);
    const { data } = await axios
      .post(
        "https://backend-f8amcudyr-prabhjotarora31s-projects.vercel.app/register",
        userData
      )
      .catch((err) => {
        console.log(err.message);
      });
    setLoading(false);
    dispatch(SetUserData({ name: "", email: "", password: "" }));
    if (data.msg == "User created")
      setMessage(`Registration Successful of ${data.email}`);
    setUserData({ name: "", email: "", password: "" });
    console.log(data);
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          // action="https://backend-f8amcudyr-prabhjotarora31s-projects.vercel.app/register"
          onSubmit(e);
        }}
        method="post"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="form-control"
            id="exampleInputName1"
            aria-describedby="nameHelp"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="form-control"
            name="password"
            id="exampleInputPassword1"
          />
        </div>
        {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div> */}
        {message != "" && <p className="text-success">{message}</p>}
        <button type="submit" className="btn btn-primary">
          {loading == true ? "Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Register;
