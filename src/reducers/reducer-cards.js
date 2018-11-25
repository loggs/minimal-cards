import {
  FLIP_CARD,
  ADD_CARD,
  EDIT_CARD,
  TOGGLE_CARD_MODE,
  FETCH_CARDS,
  DELETE_CARD,
  MOUSE_MOVE,
  MOUSE_UP,
  MOUSE_DOWN
} from "../actions/index";
import uuid from "../helpers/uuid";
// import { clamp, reinsert } from "../helpers/draggable";

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
  edit_mode: false,
  deleting: false
};

// const width = 400;
// const height = 295;
export default function(state = defaultCardsState, action) {
  switch (action.type) {
    case ADD_CARD:
      return add_card(state);

    case FLIP_CARD:
      return flip_card(state, action.payload);

    case EDIT_CARD:
      return edit_card(state, action.payload);

    case TOGGLE_CARD_MODE:
      return toggle_card_mode(state, action.payload);

    case FETCH_CARDS:
      // return action.payload.data
      return state;

    case DELETE_CARD:
      return delete_card(state, action.payload);

    case MOUSE_MOVE:
      return mouse_move(state, action.payload);

    case MOUSE_UP:
      return mouse_up(state);

    case MOUSE_DOWN:
      return mouse_down(state, action.payload);

    default:
      return state;
  }
}

const add_card = state => {
  const unique_key = uuid();
  return {
    ...state,
    data: { ...state.data, [unique_key]: defaultCardValues },
    order: [...state.order, unique_key]
  };
};

const flip_card = (state, payload) => {
  const cardKey = payload;
  const card_state = state.data[cardKey];
  return {
    ...state,
    data: {
      ...state.data,
      [cardKey]: { ...card_state, flipped: !card_state.flipped }
    }
  };
};

const edit_card = (state, payload) => {
  const { id, value } = payload;
  const card = state.data[id];
  const new_card_state = card.flipped
    ? { ...card, back_text: value } /* If flipped, update the back */
    : { ...card, front_text: value };
  return { ...state, data: { ...state.data, [id]: new_card_state } };
};

const toggle_card_mode = (state, payload) => {
  const id_t = payload;
  const card_object = state.data[id_t];
  return {
    ...state,
    data: {
      ...state.data,
      [id_t]: { ...card_object, edit_mode: !card_object.edit_mode }
    }
  };
};

const delete_card = (state, payload) => {
  const id_r = payload;
  const card_object_d = state.data[id_r];
  return {
    ...state,
    data: {
      ...state.data,
      [id_r]: {
        ...card_object_d,
        deleting: !card_object_d.deleting,
        front_text: "",
        back_text: ""
      }
    }
  };
  //return {
  // ...state,
  // order: state.order.filter(card => card !== action.payload)
  //};
};

const mouse_move = (state, payload) => {
  const {
    order,
    // lastPressed,
    isPressed,
    mouseCardDelta: [dx, dy]
  } = state;
  const { pageX, pageY } = payload;
  const mouseXY = [pageX - dx, pageY - dy];
  if (isPressed) {
    //const count = order.length;
    //const col = clamp(Math.floor(mouseXY[0] / width), 0, 2);
    //const row = clamp(
    //  Math.floor(mouseXY[1] / height),
    //  0,
    //  Math.floor(count / 3)
    //);
    //const index = row + col;
    //const newOrder = reinsert(order, order.indexOf(lastPressed), index);
    return { ...state, mouseXY: mouseXY };
  } else {
    return { ...state, mouseXY: mouseXY };
  }
};

const mouse_down = (state, payload) => {
  const {
    key,
    pressCoords: [pressX, pressY],
    pageCoords: { pageX: pageCX, pageY: pageCY }
  } = payload;
  return {
    ...state,
    lastPressed: key,
    isPressed: true,
    mouseCardDelta: [pageCX - pressX, pageCY - pressY],
    mouseXY: [pressX, pressY]
  };
};

const mouse_up = state => {
  return {
    ...state,
    isPressed: false,
    mouseCardDelta: [0, 0]
  };
};
