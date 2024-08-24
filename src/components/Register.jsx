import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetUserData } from "../redux/actions/actions";
const Register = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => {
    //console.log(state);
    return state.User;
  });
  const [userData, setUserData] = useState(user);
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('')
    setError('')
    dispatch(SetUserData(userData));
    setLoading(true);
    if (
      userData.name != "" &&
      userData.email !== "" &&
      userData.password !== ""
    ) {
      if (userData.password.length < 8) {
        seterror("Password length must be 8 characters.");
        setLoading(false);
      } else {
        const { data } = await axios
          .post(
            "https://notes-app-backend-311299newagain.vercel.app/register",
            userData
          )
          .catch((err) => {
            //console.log(err.message);
          });
        setLoading(false);
        dispatch(SetUserData({ name: "", email: "", password: "" }));
        if (data.msg == "User created") {
          setMessage(`Registration Successful`);
          setUserData({ name: "", email: "", password: "" });
          //console.log(data);
          seterror("");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (data.msg == "User already exists!") {
          seterror("User already exists!!");
        }
      }
    } else {
      // alert("PLease enter all the fieldas");
      seterror("Please enter all the fields");
      setLoading(false);
    }
  };
  return (
    <div>
      <form
        className="p-4"
        onSubmit={(e) => {
          // action="https://notes-app-backend-311299newagain.vercel.app/register"
          onSubmit(e);
        }}
        method="post"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div className="mb-3 text-center">
          <label htmlFor="exampleInputName1" className="form-label">
            Name <i class="fa-solid fa-user mx-2"></i>
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
        <div className="mb-3 text-center">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
            <i class="fa-solid fa-envelope mx-2"></i>
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
        <div className="mb-3 text-center">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
            <i class="fa-solid fa-lock mx-2"></i>
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
        {error != "" && <p className="text-danger">{error}</p>}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading == true ? true : false}
        >
          {loading == true ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Register;
