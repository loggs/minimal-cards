import { FLIP_CARD } from "../actions/index";

export default function(state = false, action) {
  switch (action.type) {
    case FLIP_CARD:
      console.log(state);
      return !state;
    default:
      return state;
  }
}
