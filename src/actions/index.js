import axios from "axios";

export const FLIP_CARD = "flip_card";
export const ADD_CARD = "add_card";
export const TOGGLE_MENU = "toggle_menu";
export const EDIT_CARD = "edit_card";
export const TOGGLE_CARD_MODE = "toggle_card_mode";
export const FETCH_CARDS = "fetch_cards";
export const DELETE_CARD = "delete_card";

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

export function editCard(id, value) {
  return {
    type: EDIT_CARD,
    payload: {
      id: id,
      value: value
    }
  };
}

export function toggleCardMode(id) {
  return {
    type: TOGGLE_CARD_MODE,
    payload: id
  };
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU
  };
}

export function fetchCards() {
  const request = axios.get(`${window.location.origin}/api/cards`);

  return {
    type: FETCH_CARDS,
    payload: request
  };
}

export function deleteCard(id) {
  return {
    type: DELETE_CARD,
    payload: id
  };
}
