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
      const unique_key = uuid();
      return {
        ...state,
        data: { ...state.data, [unique_key]: defaultCardValues },
        order: [...state.order, unique_key]
      };

    case FLIP_CARD:
      const cardKey = action.payload;
      const card_state = state.data[cardKey];
      return {
        ...state,
        data: {
          ...state.data,
          [cardKey]: { ...card_state, flipped: !card_state.flipped }
        }
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
      // return action.payload.data
      return state;

    case DELETE_CARD:
      const id_r = action.payload;
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

    case MOUSE_MOVE:
      const {
        order,
        // lastPressed,
        isPressed,
        mouseCardDelta: [dx, dy]
      } = state;
      const { pageX, pageY } = action.payload;
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

    case MOUSE_UP:
      return {
        ...state,
        isPressed: false,
        mouseCardDelta: [0, 0]
      };

    case MOUSE_DOWN:
      const {
        key,
        pressCoords: [pressX, pressY],
        pageCoords: { pageX: pageCX, pageY: pageCY }
      } = action.payload;
      return {
        ...state,
        lastPressed: key,
        isPressed: true,
        mouseCardDelta: [pageCX - pressX, pageCY - pressY],
        mouseXY: [pressX, pressY]
      };

    default:
      return state;
  }
}
