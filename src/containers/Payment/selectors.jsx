import { createSelector } from "reselect";
import { pageName } from "./constants";

const stateSelector = (state) => state[pageName];

export const getClassDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.classDTO);

// export const getResponseDTO = () =>
//   createSelector(stateSelector, (bstate) => bstate.responseDTO);

export const open = () =>
  createSelector(stateSelector, (bstate) => bstate.open);

export const modelmessage = () =>
  createSelector(stateSelector, (bstate) => bstate.modelmessage);
