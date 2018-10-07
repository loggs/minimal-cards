import { TOGGLE_MENU } from "../actions/index";

const initState = {
  menuOpen: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...state, menuOpen: !state.menuOpen };
    default:
      return state;
  }
}
