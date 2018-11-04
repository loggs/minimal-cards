import {
  FLIP_CARD,
  ADD_CARD,
  EDIT_CARD,
  TOGGLE_CARD_MODE,
  FETCH_CARDS,
  DELETE_CARD,
  MOUSE_MOVE,
  MOUSE_UP
} from "../actions/index";
import uuid from "../helpers/uuid";

const defaultCardsState = {
  data: {},
  order: [],
  mouseXY: [0, 0],
  mouseCardDelta: [0, 0],
  lastPressed: null, // Last card pressed id
  isPressed: false
};

const defaultCardValues = {
  flipped: false,
  front_text: "Front",
  back_text: "Back",
  edit_mode: false
};

export default function(state = defaultCardsState, action) {
  switch (action.type) {
    case ADD_CARD:
      const unique_key = uuid();
      return {
        data: { ...state.data, [unique_key]: defaultCardValues },
        order: [...state.order, unique_key]
      };

    case FLIP_CARD:
      const key = action.payload;
      const card_state = state.data[key];
      const flip_value = !card_state.flipped;
      return {
        ...state,
        data: { ...state.data, [key]: { ...card_state, flipped: flip_value } }
      };

    case EDIT_CARD:
      const { id, value } = action.payload;
      const card = state.data[id];
      const new_card_state = card.flipped
        ? { ...card, back_text: value } /* If flipped, update the back */
        : { ...card, front_text: value };
      return { ...state, data: { ...state.data, [id]: new_card_state } };

    case TOGGLE_CARD_MODE:
      const id_t = action.payload;
      const card_object = state.data[id_t];
      return {
        ...state,
        data: {
          ...state.data,
          [id_t]: { ...card_object, edit_mode: !card_object.edit_mode }
        }
      };

    case FETCH_CARDS:
      return action.payload.data;

    case DELETE_CARD:
      return {
        ...state,
        order: state.order.filter(card => card !== action.payload)
      };

    case MOUSE_MOVE:
      return state;

    case MOUSE_UP:
      return { ...state, isPressed: false, mouseCardDelta: [0, 0] };
    default:
      return state;
  }
}
