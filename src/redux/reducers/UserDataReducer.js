const UserDataReducer = (
  state = { name: "", email: "", password: "" },
  { type, payload }
) => {
  switch (type) {
    case "SET_USERDATA":
      return { ...state, payload };
    case "USER_PROFILE":
      return { ...state, payload };
    default:
      return state;
  }
};
export default UserDataReducer;
