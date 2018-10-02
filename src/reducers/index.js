import { combineReducers } from "redux";
import CardReducer from "./reducer-cards";

const rootReducer = combineReducers({
  flipped: CardReducer
});

export default rootReducer;
