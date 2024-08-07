const SetIdReducer = (state = "", { type, payload }) => {
  switch (type) {
    case "SETID":
      return payload;
    default:
      return state;
  }
};
export default SetIdReducer;
