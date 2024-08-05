import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserProfile } from "../redux/actions/actions";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState("");
  const [editingMode, setEditingMode] = useState(false);
  const [updateProfileShow, setUpdateProfileShow] = useState(false);
  const id = useParams();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => {
    console.log("inside profile:the states are: ", state);
    return state.LoggedInUser;
  });
  const [userDetails, setUserDetails] = useState({});
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const dispatch = useDispatch();
  //   const navigate = useNavigate()
  useEffect(() => {
    const fetchIt = async () => {
      try {
        const { data } = await axios.post(
          `https://notes-app-backend-3112.vercel.app/user-details/${id.id}`
        );
        console.log("data is : ", data);
        setUserDetails(data);
        const { name, email } = data.data;
        dispatch({
          type: "SET_LOGGEDIN_USER",
          payload: { name: name, email: email },
        });
        console.log("this is profile:", data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchIt();
  }, []);
  console.log("inside profile , id is:", id.id);
  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <button
        className="btn btn-outline-primary align-self-start mb-4"
        onClick={() => {
          navigate(`/home/${id.id}`);
        }}
      >
        Home
      </button>
      {loading === true ? (
        <div>
          <p className="rounded-circle p-4 fa-3x d-flex mt-lg-5 justify-content-center">
            <i
              className="fa-solid fa-spinner fa-spin"
              style={{ margin: "0 auto" }}
            ></i>
          </p>
        </div>
      ) : userDetails.msg == "Success" ? (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <div className="btn btn-primary btn-lg rounded-circle cursor-text">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
          {editingMode == false ? (
            <>
              <div className="mt-4 text-center">
                <h4>Name: {user.name}</h4>
                <h4>Email: {user.email}</h4>
              </div>
              <div className="mt-4 mb-4">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setEditingMode(true);
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
                <br />
                {toast == "Success" && (
                  <>
                    <div className="rounded p-2 border-start border-end border-top border-bottom border-dark border-green text-success mt-4">
                      Updated profile successfully
                      <button
                        className="ml-md-2 btn btn-outline-primary ms-2"
                        onClick={() => {
                          setToast("");
                        }}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mt-4">
                <h5>Edit Profile</h5>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-4 d-flex flex-column align-items-center gap-4 p-4 border-dark border-start border-end border-top border-bottom rounded"
                >
                  <div className="align-self-start">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setEditingMode(false);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, name: e.target.value })
                      }
                      id="name"
                      aria-describedby="nameHelp"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        })
                      }
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label for="phone">Phone</label>
                    <input
                      type="number"
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          phone: e.target.value,
                        })
                      }
                      className="form-control"
                      id="phone"
                      placeholder="Phone"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      const update = async () => {
                        const { data } = await axios.post(
                          `https://notes-app-backend-3112.vercel.app/profile-update/${id.id}`,
                          userDetails
                        );
                        console.log(data);
                        if (data.msg == "Success") {
                          setEditingMode(false);
                          //   dispatch(UserProfile(data.data));
                          dispatch({
                            type: "SET_LOGGEDIN_USER",
                            payload: data.data,
                          });
                          setToast("Success");
                          //   navigate(`/home/profile/${id.id}`);
                        }
                      };
                      update();
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      ) : (
        <>Some error occured</>
      )}
    </div>
  );
};

export default ProfilePage;
