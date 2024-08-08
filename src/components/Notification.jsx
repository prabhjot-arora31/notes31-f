import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SetNotification } from "../redux/actions/actions";

const Notification = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  //console.log("localStorage:", localStorage.getItem("shoNoti"));

  const notification = useSelector((state) => {
    return state.SetNotificationReducer;
  });
  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        notification == true && (
          <div className=" d-flex justify-content-center w-full">
            <div className=" p-3 alert alert-warning fw-bold mt-4 border-start border-end border-top border-bottom w-full d-flex justify-content-center align-items-center gap-4">
              More to come. Stay tuned
              <button
                className="btn btn-outline-dark"
                onClick={() => {
                  localStorage.setItem("shoNoti", false);
                  //console.log("localStorage:", localStorage.getItem("shoNoti"));
                  dispatch(
                    SetNotification(
                      localStorage.getItem("shoNoti")
                        ? localStorage.getItem("shoNoti")
                        : false
                    )
                  );
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default Notification;
