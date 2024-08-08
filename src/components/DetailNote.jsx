import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteNote, ViewDetail } from "../redux/actions/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DetailNote = () => {
  const { id } = useParams();
  const [isNoteShareable, setIsNoteShareable] = useState();
  const detailNote = useSelector((state) => state.ViewNoteDetail);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [viewDetailLoading, setViewDetailLoading] = useState(true);
  const [isViewDetail, setIsViewDetail] = useState(false);
  const USERID = useSelector((state) => {
    //console.log(state);
    return state.SetIdReducer;
  });

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const viewNoteDetail = useSelector((state) => state.ViewNoteDetail);
  const [actualData, setActualData] = useState({});
  //console.log("viewNoteDetail", viewNoteDetail);
  const [userId, setuserId] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    desc: "",
    isShareable: false,
  });

  const getDetail = async () => {
    setIsViewDetail(true);
    setuserId(USERID);
    const userId2 = localStorage.getItem("user-id");
    const { data } = await axios.post(
      `http://localhost:3001/view-note/${id}`,
      {
        id: userId2,
      }
    );
    //console.log(data);
    if (data.msg == "Success") {
      setIsNoteShareable(true);
      setActualData(data);
      dispatch(ViewDetail(data.data));
      setViewDetailLoading(false);
      //console.log("data.data.title is:", data.data.title);
      setEditData({
        title: data.data.title,
        desc: data.data.desc,
        isShareable: data.data.isShareable,
      });
    } else if (data.msg == "Success 2") {
      setIsNoteShareable(true);
      setActualData(data);
      dispatch(ViewDetail(data.data));
    } else if (data.msg == "Failure") {
      setIsNoteShareable(false);
      dispatch(ViewDetail({ isShareable: false }));
    }
  };
  useEffect(() => {
    getDetail();
    return () => {
      dispatch(ViewDetail({}));
    };
  }, []);
  const deleteNote = async (noteId) => {
    //console.log("id is:", noteId);
    const { data } = await axios.post(
      `http://localhost:3001/${noteId}`
    );
    //console.log("after deleting", data);
    if (data.msg == "Deleted note") {
      dispatch(DeleteNote(data.data));
      //console.log("navigating.....");
      navigate(`/notes-app-31/home/${userId}`);
    }
    //console.log(data);
  };
  return (
    <div>
      {viewDetailLoading == true && Object.keys(detailNote).length <= 0 ? (
        <div>
          <p className="rounded-circle p-4 fa-3x d-flex mt-lg-5 justify-content-center">
            <i
              className="fa-solid fa-spinner fa-spin"
              style={{ margin: "0 auto" }}
            ></i>
          </p>
        </div>
      ) : isNoteShareable == false ? (
        <h3 className="text-danger fs-lg m-4 font-bold text-center">
          Sorry. This note is not shareable.
        </h3>
      ) : (
        <div className="d-flex p-4 flex-column align-items-center container p-4">
          <button
            onClick={() => {
              navigate(`/notes-app-31/home/${localStorage.getItem("user-id")}`);
            }}
            className="mb-4 mt-4 btn btn-primary"
          >
            View all Notes
          </button>

          {editMode == false ? (
            <div>
              {actualData.data && actualData.data.isShareable == false ? (
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn btn-outline-primary  btn-md">
                    <i className="fa-solid fa-lock"></i>
                  </button>
                  <p className="m-0 mx-2 text-primary fs-6">
                    This note is private
                  </p>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <button className="btn btn-outline-success btn-md">
                    <i className="fa-solid fa-share"></i>
                  </button>
                  <p className="m-0 mx-2 text-success fs-6">
                    This note is shareable
                  </p>
                </div>
              )}
              <div className="d-flex gap-4  align-items-center justify-content-center flex-wrap">
                {/* detailNotes.title */}
                <div
                  className="card mt-4 border-dark"
                  style={{ width: "20rem" }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="card-title">{detailNote.title}</h4>
                    </div>
                    <p className="card-text fs-6">{detailNote.desc}</p>
                  </div>
                </div>
                {/* end */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary btn-md"
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>{" "}
                    {/* <i className=""></i> */}
                    {/* <i className="simple-icon">share_disabled</i> */}
                    {/* <i className="bi bi-slash"></i> */}
                  </button>

                  <button
                    className="btn btn-outline-danger btn-md"
                    onClick={() => {
                      deleteNote(detailNote._id);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h5 className="mb-4">Edit Note</h5>
              <div className="d-flex align-items-start gap-4 flex-column-reverse border-start border-end rounded border-top border-bottom p-4 border-dark">
                <div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-3">
                      <label for="title" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
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
                        name="desc"
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
                        name="isShareable"
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
                    <button
                      className="btn btn-primary"
                      disabled={loading ? true : false}
                      onClick={() => {
                        setLoading(true);
                        const updateNote = async () => {
                          const { data } = await axios.post(
                            `http://localhost:3001/update-note/${id}`,
                            editData
                          );
                          //console.log(data);
                          if (data.msg == "Success") {
                            dispatch(ViewDetail(data.data));
                            setLoading(false);
                            setEditMode(false);
                          }
                        };
                        updateNote();
                      }}
                    >
                      {loading ? "Please wait" : "Submit"}
                    </button>
                  </form>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailNote;
