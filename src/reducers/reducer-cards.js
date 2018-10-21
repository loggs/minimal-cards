import {
  FLIP_CARD,
  ADD_CARD,
  EDIT_CARD,
  TOGGLE_CARD_MODE,
  FETCH_CARDS
} from "../actions/index";
import uuid from "../helpers/uuid";

const defaultCardValues = {
  flipped: false,
  front_text: "Front",
  back_text: "Back",
  edit_mode: false
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

    case TOGGLE_CARD_MODE:
      const id_t = action.payload;
      const card_object = state[id_t];
      return {
        ...state,
        [id_t]: { ...card_object, edit_mode: !card_object.edit_mode }
      };

    case FETCH_CARDS:
      return action.payload.data;

    default:
      return state;
  }
}
