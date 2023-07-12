import { createSelector } from "reselect";
import { pageName } from "./constant";

const stateSelector = (state) => state.get(pageName);

export const getRegistrationForm = () =>
  createSelector(stateSelector, (bstate) => bstate.getRegistrationForm);

export const getClassDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.classDTO);

export const open = () =>
  createSelector(stateSelector, (bstate) => bstate.open);
