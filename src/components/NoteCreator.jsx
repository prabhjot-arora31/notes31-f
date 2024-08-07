import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loggedInUserNotes,
  SwitchDisplayAndCreateNote,
} from "../redux/actions/actions";
import axios from "axios";

const NoteCreator = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    //console.log(state);
    return state.LoggedInUser;
  });
  const [data1, setdata1] = useState({ title: "", desc: "", shareable: false });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://notes-app-backend-311299newagain.vercel.app/create-note/${user.id}`,
        data1
      );
      setMessage(data.msg);
      // const { title, desc, createdAt } = data.data;
      //console.log(data.data);
      //console.log("message is: ", message);
      dispatch(loggedInUserNotes(data.data));
      dispatch(SwitchDisplayAndCreateNote("DISPLAY"));
      setLoading(false);
    } catch (err) {
      //console.log(err.message);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(SwitchDisplayAndCreateNote("DISPLAY"));
        }}
      >
        View all Notes
      </button>
      <form
        onSubmit={(e) => {
          submit(e);
        }}
        className="w-50 border-top border-end border-start border-bottom mt-4 p-4 border-secondary border-info rounded"
      >
        <h4>Create note</h4>
        <div className="mb-3 mt-4 ">
          <label for="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            onChange={(e) => setdata1({ ...data1, title: e.target.value })}
            name="title"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="desc" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="desc"
            onChange={(e) => setdata1({ ...data1, desc: e.target.value })}
            name="desc"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            onChange={(e) => setdata1({ ...data1, shareable: e.target.value })}
            name="shareable"
          />
          <label className="form-check-label" for="exampleCheck1">
            Wanna make shareable?
          </label>
        </div>
        {message == "Success" && (
          <div className="text-success">Note created successfully</div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading ? true : false}
        >
          {loading ? "Please wait" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NoteCreator;
