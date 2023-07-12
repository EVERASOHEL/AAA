import { createSelector } from "reselect";
import { pageName } from "./constants";

const stateSelector = (state) => state[pageName];

export const getRegistrationForm = () =>
  createSelector(stateSelector, (bstate) => bstate.getRegistrationForm);

export const getClassDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.classDTO);

export const open = () =>
  createSelector(stateSelector, (bstate) => bstate.open);

export const productlist = () =>
  createSelector(stateSelector, (bstate) => bstate.productlist);

export const currentPage = () =>
  createSelector(stateSelector, (bstate) => bstate.currentPage);

export const currentPageSize = () =>
  createSelector(stateSelector, (bstate) => bstate.currentPageSize);
