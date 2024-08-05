import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { LoggedInUser, SetToast } from "../redux/actions/actions";
import NotesDisplay from "../components/NotesDisplay";
import NoteCreator from "../components/NoteCreator";

const HomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.SetToastReducer);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.LoggedInUser);
  const whatToDisplay = useSelector(
    (state) => state.DisplayAndCreateNoteReducer
  );
  const fetchData = async () => {
    console.log("before fetching user details , id is:", id);
    const { data } = await axios.get(
      `https://backend-f8amcudyr-prabhjotarora31s-projects.vercel.app/home/${id}`
    );
    dispatch(LoggedInUser(data));
    setLoading(false);
    console.log(data);

    // if (data == "Please login to continue") {
    //   if (!user.id) navigate("/");
    //   else navigate(`/home/${user.id}`);
    // }
  };
  useEffect(() => {
    console.log(document.cookie);
    if (document.cookie.startsWith("user-cookie")) {
      fetchData();
      var cookie = decodeURIComponent(document.cookie);
      var userrId = cookie.substring(15, cookie.length - 1);
      console.log("cookie:", userrId);
      console.log("is equal:", userrId == id);
      if ((userrId == id) == false) {
        navigate(`/home/${userrId}`);
      }
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {loading ? (
        <div>
          <p className="rounded-circle p-4 fa-3x d-flex mt-lg-5 justify-content-center">
            <i
              className="fa-solid fa-spinner fa-spin"
              style={{ margin: "0 auto" }}
            ></i>
          </p>
        </div>
      ) : (
        <div className="p-4">
          <div className="d-flex align-items-center mb-4">
            <button
              className="btn btn-outline-primary rounded-circle btn-lg"
              onClick={() => {
                navigate(`/home/profile/${id}`);
              }}
            >
              <i class="fa-regular fa-user"></i>
            </button>
          </div>
          <div className="d-flex justify-content-center w-full mb-4">
            {toast == "Success" && (
              <div className=" rounded p-1 border-start border-end border-top border-bottom border-dark border-green text-success ">
                Copied to clipboard
                <button
                  className="ml-md-2 btn btn-outline-primary ms-2"
                  onClick={() => {
                    dispatch(SetToast(""));
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}
          </div>
          <h3>Welcome back, {user.name}</h3>
          {whatToDisplay == "DISPLAY" ? <NotesDisplay /> : <NoteCreator />}
        </div>
      )}
    </div>
  );
};

export default HomePage;
