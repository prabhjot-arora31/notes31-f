// import DisplayAndCreateNoteReducer from "./DisplayAndCreateNoteReducer";
import DisplayAndCreateNoteReducer from "./DisplayAndCreateNoteReducer";
import LoggedInUserReducer from "./LoggedInUserReducer";
import UserDataReducer from "./UserDataReducer";
import { combineReducers } from "redux";
import ViewNoteDetail from "./ViewNoteDetail";
import SetToastReducer from "./SetToastReducer";
import SetNotificationReducer from "./SetNotifcationReducer";
import SetIdReducer from "./SetIdReducer";
const rootReducer = combineReducers({
  User: UserDataReducer,
  LoggedInUser: LoggedInUserReducer,
  DisplayAndCreateNoteReducer,
  ViewNoteDetail,
  SetToastReducer,
  SetNotificationReducer,
  SetIdReducer,
});
export default rootReducer;
