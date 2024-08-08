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
  const [error, seterror] = useState("");
  const [msg, setMsg] = useState("");
  const id = useParams();
  const [loadingForUpdatePassword, setLoadingForUpdatePassword] =
    useState(false);
  const [showUpdatePasswordDialog, setShowUpdatePasswordDialog] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingWhenUpdate, setLoadingWhenUpdate] = useState(false);
  const user = useSelector((state) => {
    //console.log("inside profile:the states are: ", state);
    return state.LoggedInUser;
  });
  const [userDetails, setUserDetails] = useState({});
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchIt = async () => {
      try {
        const { data } = await axios.post(
          `https://notes-app-backend-311299newagain.vercel.app/user-details/${id.id}`
        );
        //console.log("data is : ", data);
        setUserDetails(data);
        const { name, email, phone } = data.data;
        dispatch({
          type: "SET_LOGGEDIN_USER",
          payload: { name: name, email: email, phone: phone },
        });
        //console.log("this is profile:", data);
        setLoading(false);
      } catch (err) {
        //console.log(err.message);
      }
    };
    fetchIt();
    console.log("user is:", user);
  }, []);
  //console.log("inside profile , id is:", id.id);
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
                {user.phone && <h4>Phone: {user.phone}</h4>}
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
              {showUpdatePasswordDialog ? (
                <div className="mt-4">
                  <h5 className="">Update Password</h5>
                  <div className="p-4 mt-4 border-start border-end border-dark border-top border-bottom rounded">
                    <form
                      action="https://notes-app-backend-311299newagain.vercel.app/update-password"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setLoadingForUpdatePassword(true);
                        const form = e.target;
                        console.log("form is:", form);
                        const formData = new FormData(form);
                        const old = formData.get("old").trim();
                        const id = formData.get("id").trim();
                        const newPass = formData.get("newPass").trim();
                        const newPass2 = formData.get("newPass2").trim();
                        const updatePass = (e) => {
                          seterror("");
                          console.log("old:", old);
                          console.log("formData is:", formData);
                          axios
                            .post(
                              form.action,
                              {
                                old,
                                newPass,
                                id,
                              },
                              {
                                headers: {
                                  "Content-Type": "application/json",
                                },
                              }
                            )
                            .then((data) => {
                              console.log("rData: ", data);
                              setLoadingForUpdatePassword(false);
                              if (data.data.msg != "Success")
                                seterror(data.data.msg);
                              else {
                                setMsg(data.data.msg);
                                setTimeout(() => {
                                  setShowUpdatePasswordDialog(false);
                                }, 2210);
                              }
                            })
                            .catch((err) => {
                              console.log(err.message);
                            });
                          // console.log("update password data:", data);
                        };
                        if (
                          newPass.trim() != "" &&
                          newPass2.trim() != "" &&
                          old.trim() != ""
                        ) {
                          if (newPass !== newPass2) {
                            seterror(
                              "Please enter the same password while re-entering."
                            );
                            setLoadingForUpdatePassword(false);
                          } else {
                            updatePass(e);
                          }
                        } else {
                          setLoadingForUpdatePassword(false);
                          seterror("Please enter all the fields");
                        }
                      }}
                    >
                      <input
                        type="hidden"
                        value={localStorage.getItem("user-id")}
                        name="id"
                      />
                      <div className="align-self-start mb-4">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            setShowUpdatePasswordDialog(false);
                            seterror('')
                          }}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                          Old Password
                        </label>
                        <input
                          style={{
                            borderColor: `${
                              error == "Please enter all the fields"
                                ? "red"
                                : "lightgray"
                            }`,
                          }}
                          type="password"
                          class="form-control"
                          name="old"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                          New Password
                        </label>
                        <input
                          style={{
                            borderColor: `${
                              error ==
                              "Please enter the same password while re-entering."
                                ? "red"
                                : "lightgray"
                            }`,
                          }}
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                          name="newPass"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                          Re-enter New Password
                        </label>
                        <input
                          style={{
                            borderColor: `${
                              error ==
                              "Please enter the same password while re-entering."
                                ? "red"
                                : "lightgray"
                            }`,
                          }}
                          type="password"
                          class="form-control"
                          name="newPass2"
                          id="exampleInputPassword1"
                        />
                      </div>
                      {error != "" && <p className="text-danger">{error}</p>}
                      {msg != "" && (
                        <p className="text-success">
                          Password updated Successfully.
                        </p>
                      )}
                      <button
                        disabled={loadingForUpdatePassword ? true : false}
                        className="btn btn-primary"
                      >
                        {loadingForUpdatePassword ? "Please wait.." : "Submit"}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <h5>Edit Profile</h5>

                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-4 d-flex mb-4 flex-column align-items-center gap-4 p-4 border-dark border-start border-end border-top border-bottom rounded"
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
                          setUserDetails({
                            ...userDetails,
                            name: e.target.value,
                          })
                        }
                        id="name"
                        aria-describedby="nameHelp"
                        placeholder={user.name}
                      />
                    </div>
                    <div className="form-group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        readOnly={true}
                        className="form-control"
                        value={user.email}
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
                        // value={user.phone}

                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            phone: e.target.value,
                          })
                        }
                        className="form-control"
                        id="phone"
                        placeholder={user.phone}
                      />
                    </div>
                    <div
                      className="alert alert-warning"
                      style={{ fontSize: "13px" }}
                    >
                      <b> Note:</b> You can't update the email
                    </div>
                    <button
                      type="submit"
                      disabled={loadingWhenUpdate ? true : false}
                      className="btn btn-primary"
                      onClick={() => {
                        setLoadingWhenUpdate(true);
                        const update = async () => {
                          const { data } = await axios.post(
                            `https://notes-app-backend-311299newagain.vercel.app/profile-update/${id.id}`,
                            userDetails
                          );
                          //console.log(data);
                          if (data.msg == "Success") {
                            setEditingMode(false);
                            setLoadingWhenUpdate(false);
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
                      {loadingWhenUpdate ? "Please wait" : "Submit"}
                    </button>
                    <p
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setShowUpdatePasswordDialog(true)}
                    >
                      Update password?{" "}
                    </p>
                  </form>
                </div>
              )}
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
