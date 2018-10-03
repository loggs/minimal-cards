import { combineReducers } from "redux";
import CardReducer from "./reducer-cards";

const rootReducer = combineReducers({
  cards: CardReducer
});

export default rootReducer;
