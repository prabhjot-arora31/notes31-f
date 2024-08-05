// import DisplayAndCreateNoteReducer from "./DisplayAndCreateNoteReducer";
import DisplayAndCreateNoteReducer from "./DisplayAndCreateNoteReducer";
import LoggedInUserReducer from "./LoggedInUserReducer";
import UserDataReducer from "./UserDataReducer";
import { combineReducers } from "redux";
import ViewNoteDetail from "./ViewNoteDetail";
import SetToastReducer from "./SetToastReducer";
const rootReducer = combineReducers({
  User: UserDataReducer,
  LoggedInUser: LoggedInUserReducer,
  DisplayAndCreateNoteReducer,
  ViewNoteDetail,
  SetToastReducer,
});
export default rootReducer;
