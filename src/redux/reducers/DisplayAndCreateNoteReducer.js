const DisplayAndCreateNoteReducer = (state = "DISPLAY", { type, payload }) => {
  switch (type) {
    case "SWITCH_DISPLAY_AND_CREATE_NOTE":
      return payload;
    default:
      return state;
  }
};
export default DisplayAndCreateNoteReducer;
