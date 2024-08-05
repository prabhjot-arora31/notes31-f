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
    console.log(state);
    return state.LoggedInUser;
  });
  const [data1, setdata1] = useState({ title: "", desc: "", shareable: false });
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://notes-app-backend-3112.vercel.app/create-note/${user.id}`,
        data1
      );
      setMessage(data.msg);
      // const { title, desc, createdAt } = data.data;
      console.log(data.data);
      console.log("message is: ", message);
      dispatch(loggedInUserNotes(data.data));
      dispatch(SwitchDisplayAndCreateNote("DISPLAY"));
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
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
        <div class="mb-3 mt-4 ">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            onChange={(e) => setdata1({ ...data1, title: e.target.value })}
            name="title"
            class="form-control"
            id="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="desc" class="form-label">
            Description
          </label>
          <textarea
            type="text"
            class="form-control"
            id="desc"
            onChange={(e) => setdata1({ ...data1, desc: e.target.value })}
            name="desc"
          />
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
            onChange={(e) => setdata1({ ...data1, shareable: e.target.value })}
            name="shareable"
          />
          <label class="form-check-label" for="exampleCheck1">
            Wanna make shareable?
          </label>
        </div>
        {message == "Success" && (
          <div className="text-success">Note created successfully</div>
        )}
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NoteCreator;
