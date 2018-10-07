export const FLIP_CARD = "flip_card";
export const ADD_CARD = "add_card";
export const TOGGLE_MENU = "toggle_menu";

export function flipCard(id) {
  return {
    type: FLIP_CARD,
    payload: id
  };
}

export function addCard() {
  return {
    type: ADD_CARD
  };
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU
  };
}
