import { FLIP_CARD } from "../actions/index";

export default function(state = { flipped: false }, action) {
  switch (action.type) {
    case FLIP_CARD:
      return { flipped: !state.flipped };
    default:
      return state;
  }
}
