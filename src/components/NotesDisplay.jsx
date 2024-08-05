import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteNote,
  SetToast,
  SwitchDisplayAndCreateNote,
  ViewDetail,
} from "../redux/actions/actions";
import axios from "axios";

const NotesDisplay = () => {
  const detailNote = useSelector((state) => state.ViewNoteDetail);
  const [viewDetailLoading, setViewDetailLoading] = useState(true);
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const [editData, setEditData] = useState({
    title: "",
    desc: "",
    isShareable: false,
  });
  const dispatch = useDispatch();
  const viewNote = (id) => {
    navigate(`/note/${id}`);
  };
  const [showShareDialog, setShowShareDialog] = useState({
    show: false,
    id: "",
  });
  const shareNote = async (id) => {
    setShowShareDialog({ show: true, id: id });
  };
  const deleteNote = async (id) => {
    console.log("id is:", id);
    const { data } = await axios.post(
      `https://backend-f8amcudyr-prabhjotarora31s-projects.vercel.app/delete-note/${id}`
    );
    console.log("after deleting", data);
    if (data.msg == "Deleted note") dispatch(DeleteNote(data.data));
    console.log(data);
  };
  const user = useSelector((state) => state.LoggedInUser);
  return (
    <div>
      {isViewDetail ? (
        <div>
          {viewDetailLoading == true && Object.keys(detailNote).length <= 0 ? (
            <div>Loading...</div>
          ) : (
            <div className="d-flex flex-column align-items-start">
              <button
                onClick={() => {
                  setIsViewDetail(false);
                  dispatch(ViewDetail({}));
                  setViewDetailLoading(true);
                  setEditMode(false);
                }}
                className="mb-4 mt-4 btn btn-primary"
              >
                View all Notes
              </button>

              {editMode == false ? (
                <div className="d-flex gap-4  align-items-center">
                  {/* detailNotes.title */}
                  <div
                    className="card mt-4 border-dark"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{detailNote.title}</h5>
                      </div>
                      <p className="card-text">{detailNote.desc}</p>
                    </div>
                  </div>
                  {/* end */}
                  <div>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setEditMode(true);
                      }}
                    >
                      <i className="fa-regular fa-pen-to-square"></i>{" "}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h5 className="mb-4">Edit Note</h5>
                  <div className="d-flex align-items-start gap-4 flex-column-reverse border-start border-end rounded border-top border-bottom p-4 border-dark">
                    <div>
                      <form>
                        <div className="mb-3">
                          <label for="title" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={editData.title}
                            onChange={(e) => {
                              setEditData({
                                ...editData,
                                title: e.target.value,
                              });
                            }}
                            aria-describedby="titleHelp"
                          />
                        </div>
                        <div className="mb-3">
                          <label for="desc" className="form-label">
                            Description
                          </label>
                          <textarea
                            type="text"
                            value={editData.desc}
                            onChange={(e) => {
                              setEditData({
                                ...editData,
                                desc: e.target.value,
                              });
                            }}
                            className="form-control"
                            id="desc"
                          />
                        </div>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            checked={editData.isShareable}
                            onChange={(e) => {
                              setEditData({
                                ...editData,
                                isShareable: e.target.checked,
                              });
                            }}
                            className="form-check-input"
                            id="shareable"
                          />
                          <label className="form-check-label" for="shareable">
                            Wanna make shareable?
                          </label>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="d-flex mt-4 w-full justify-content-between">
            <h5>Notes</h5>
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(SwitchDisplayAndCreateNote("NOTE"));
              }}
            >
              Create note
            </button>
          </div>
          {/* search functionality */}
          {/* <div className="container mb-4 mt-4 ">
            <form
              class="d-flex justify-content-center collapse navbar-collapse"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                class="form-control me-2 border-dark"
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  // return ele.title == e.target.value;
                  setSearchTerm(e.target.value);
                }}
                aria-label="Search"
                style={{ maxWidth: "290px" }}
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  dispatch({
                    type: "SET_LOGGED_IN_USER_NOTES",
                    payload: searchTerm,
                  });
                }}
              >
                Search
              </button>
            </form>
          </div> */}
          {/* end search functionality */}
          <div className="d-flex gap-4 justify-content-center flex-wrap align-items-center">
            {user && user.notes && user.notes.length > 0 ? (
              user.notes.map((ele, id) => {
                return (
                  <div
                    className="card mt-4 border-dark"
                    style={{
                      width: "19rem",
                      position: "relative",
                      // alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        overflow: "hidden",
                        zIndex: "0",
                        width: "100%",
                        opacity: "0.4",
                        margin: "0 auto",
                        alignSelf: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{ width: "150px", margin: "0 auto" }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdqL2-rFtYBqHHiSSxBP2pKCRJqiyV0Yb89w&s"
                      />
                    </div>
                    <div style={{ zIndex: "10" }} className="card-body">
                      {ele.isShareable == true && (
                        <button
                          className="btn btn-outline-success mb-2 btn-sm"
                          onClick={() => {
                            shareNote(ele._id);
                          }}
                        >
                          <i className="fa-solid fa-share"></i>
                        </button>
                      )}
                      {ele.isShareable == true &&
                        showShareDialog.show == true &&
                        showShareDialog.id == ele._id && (
                          <div className="d-flex align-items-center justify-content-center mb-2 py-1 px-1 border-left border-dark border-start border-end border-top border-bottom rounded">
                            <p
                              className="m-0 p-2 py-1 btn btn-primary"
                              onClick={() => {
                                setShowShareDialog({
                                  id: "",
                                  show: false,
                                });
                              }}
                            >
                              X
                            </p>
                            <p className="m-0">https://localhost:5173/note</p>
                            <span></span>
                            <button
                              className="btn ml-sm-3 btn-success btn-sm"
                              onClick={() => {
                                if (navigator.clipboard) {
                                  navigator.clipboard
                                    .writeText(
                                      `
                      http://localhost:5173/note/${ele._id}
                                    `
                                    )
                                    .then(() => {
                                      dispatch(SetToast("Success"));
                                      setShowShareDialog({
                                        id: "",
                                        show: false,
                                      });
                                    })
                                    .catch((err) => {
                                      console.log(
                                        "failed to copy to clipboard:",
                                        err.message
                                      );
                                    });
                                }
                              }}
                            >
                              Copy
                            </button>
                          </div>
                        )}
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{ele.title}</h5>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            deleteNote(ele._id);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <p className="card-text">
                        {ele.desc && ele.desc.length > 20 ? (
                          <div>
                            <p className="m-0 mb-2">
                              {ele.desc.substring(0, 20)}...
                            </p>{" "}
                          </div>
                        ) : (
                          ele.desc
                        )}
                        <button
                          onClick={() => {
                            viewNote(ele._id);
                          }}
                          className={`${
                            ele.desc && ele.desc.length > 20
                              ? "btn btn-outline-primary btn-sm"
                              : " btn btn-outline-primary btn-sm mx-2"
                          }`}
                        >
                          View
                        </button>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-4">No notes available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesDisplay;
