import { FLIP_CARD, ADD_CARD, EDIT_CARD } from "../actions/index";
import uuid from "../helpers/uuid";

const defaultCardValues = {
  flipped: false,
  front_text: "Front",
  back_text: "Back"
};

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const unique_key = uuid();
      return { ...state, [unique_key]: defaultCardValues };

    case FLIP_CARD:
      const key = action.payload;
      const card_state = state[key];
      const flip_value = !card_state.flipped;
      return { ...state, [key]: { ...card_state, flipped: flip_value } };

    case EDIT_CARD:
      const { id, value } = action.payload;
      const card = state[id];
      const new_card_state = card.flipped
        ? { ...card, back_text: value } /* If flipped, update the back */
        : { ...card, front_text: value };
      return { ...state, [id]: new_card_state };

    default:
      return state;
  }
}
