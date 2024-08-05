const LoggedInUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "SET_LOGGEDIN_USER":
      return payload;
    case "SET_LOGGED_IN_USER_NOTES":
      return { ...state, notes: [...state.notes, payload] };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((ele) => ele._id != payload._id),
      };
    default:
      return state;
  }
};

export default LoggedInUserReducer;
