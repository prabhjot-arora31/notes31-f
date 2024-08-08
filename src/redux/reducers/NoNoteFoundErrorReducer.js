const NoNoteFoundErrorReducer = (state = "", { type, payload }) => {
  switch (type) {
    case "SET_NO_NOTE_FOUND":
      return payload;
    default:
      return state;
  }
};
export default NoNoteFoundErrorReducer;
