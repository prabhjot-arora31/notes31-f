const SetToastReducer = (state = "", { type, payload }) => {
  switch (type) {
    case "SET_TOAST":
      return payload;
    default:
      return state;
  }
};
export default SetToastReducer;
