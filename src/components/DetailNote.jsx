import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewDetail } from "../redux/actions/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DetailNote = () => {
  const { id } = useParams();
  const [isNoteShareable, setIsNoteShareable] = useState();
  const detailNote = useSelector((state) => state.ViewNoteDetail);
  const dispatch = useDispatch();
  const [viewDetailLoading, setViewDetailLoading] = useState(true);
  const [isViewDetail, setIsViewDetail] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const viewNoteDetail = useSelector((state) => state.ViewNoteDetail);
  const [actualData, setActualData] = useState({});
  console.log("viewNoteDetail", viewNoteDetail);
  const [userId, setuserId] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    desc: "",
    isShareable: false,
  });
  const getDetail = async () => {
    setIsViewDetail(true);
    var cookie = decodeURIComponent(document.cookie);
    var userrId = cookie.substring(15, cookie.length - 1);
    setuserId(userrId);
    const { data } = await axios.post(
      `https://notes-app-backend-3112.vercel.app/view-note/${id}`,
      {
        id: userrId,
      }
    );
    console.log(data);
    if (data.msg == "Success") {
      setIsNoteShareable(true);
      setActualData(data);
      dispatch(ViewDetail(data.data));
      setViewDetailLoading(false);
      console.log("data.data.title is:", data.data.title);
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
        <h3 className="text-danger fs-lg m-4 font-bold">
          Sorry. This note is not shearable.
        </h3>
      ) : (
        <div className="d-flex p-4 flex-column align-items-start">
          <button
            onClick={() => {
              navigate(`/home/${userId}`);
            }}
            className="mb-4 mt-4 btn btn-primary"
          >
            View all Notes
          </button>

          {editMode == false ? (
            <div className="d-flex gap-4  align-items-center">
              {/* detailNotes.title */}
              <div className="card mt-4 border-dark" style={{ width: "18rem" }}>
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
                      onClick={() => {
                        const updateNote = async () => {
                          const { data } = await axios.post(
                            `https://notes-app-backend-3112.vercel.app/update-note/${id}`,
                            editData
                          );
                          console.log(data);
                          if (data.msg == "Success") {
                            dispatch(ViewDetail(data.data));
                            setEditMode(false);
                          }
                        };
                        updateNote();
                      }}
                    >
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
  );
};

export default DetailNote;
