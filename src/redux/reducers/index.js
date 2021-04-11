import columnsReducer from "./columns";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  columns: columnsReducer,
});

export default rootReducer;
