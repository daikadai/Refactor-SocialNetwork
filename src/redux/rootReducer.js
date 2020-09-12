import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import uiReducer from "./ui/ui.reducer";
import dataReducer from "./data/data.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  UI: uiReducer,
  data: dataReducer
})

export default rootReducer;