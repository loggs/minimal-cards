import { FLIP_CARD, ADD_CARD } from "../actions/index";
import uuid from "../helpers/uuid";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const unique_key = uuid();
      return { ...state, [unique_key]: { flipped: false } };

    case FLIP_CARD:
      const key = action.payload;
      const flip_value = !state[action.payload].flipped;
      return { ...state, [key]: { flipped: flip_value } };

    default:
      return state;
  }
}
