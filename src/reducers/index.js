import { combineReducers } from "redux";
import CardReducer from "./reducer-cards";
import MenuReducer from "./reducer-menu";

const rootReducer = combineReducers({
  cards: CardReducer,
  menuOptions: MenuReducer
});

export default rootReducer;
