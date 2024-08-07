export const SetUserData = (data) => {
  return {
    type: "SET_USERDATA",
    payload: data,
  };
};
export const LoggedInUser = (data) => {
  return {
    type: "SET_LOGGEDIN_USER",
    payload: data,
  };
};

export const loggedInUserNotes = (data) => {
  return {
    type: "SET_LOGGED_IN_USER_NOTES",
    payload: data,
  };
};

export const SwitchDisplayAndCreateNote = (data) => {
  return {
    type: "SWITCH_DISPLAY_AND_CREATE_NOTE",
    payload: data,
  };
};
export const DeleteNote = (data) => {
  return {
    type: "DELETE_NOTE",
    payload: data,
  };
};

export const ViewDetail = (data) => {
  return {
    type: "VIEW_DETAIL_OF_NOTE",
    payload: data,
  };
};

export const UserProfile = (data) => {
  return {
    type: "USER_PROFILE",
    payload: data,
  };
};

export const SetToast = (data) => {
  return {
    type: "SET_TOAST",
    payload: data,
  };
};

export const SetNotification = (data) => {
  return {
    type: "SET_NOTIFICATION",
    payload: data,
  };
};

export const SETID = (data) => {
  return {
    type: "SETID",
    payload: data,
  };
};
