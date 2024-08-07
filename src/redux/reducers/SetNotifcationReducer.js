const SetNotificationReducer = (
  state = localStorage.getItem("shoNoti")
    ? localStorage.getItem("shoNoti")
    : true,
  { type, payload }
) => {
  switch (type) {
    case "SET_NOTIFICATION":
      return payload == false ? false : payload;
    default:
      return state;
  }
};
export default SetNotificationReducer;
