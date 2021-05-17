import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { eventReducer } from "./eventReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  event: eventReducer,
  auth: authReducer, 
});
