const ViewNoteDetail = (state = {}, { type, payload }) => {
  switch (type) {
    case "VIEW_DETAIL_OF_NOTE":
      return payload;
    default:
      return state;
  }
};
export default ViewNoteDetail;
