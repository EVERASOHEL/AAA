import { createSelector } from "reselect";
import { pageName } from "./constants";

const stateSelector = (state) => state[pageName];

export const getClassDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.classDTO);

export const getResponseDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.responseDTO);

export const open = () =>
  createSelector(stateSelector, (bstate) => bstate.open);

export const companylist = () =>
  createSelector(stateSelector, (bstate) => bstate.companylist);

export const currentPage = () =>
  createSelector(stateSelector, (bstate) => bstate.currentPage);

export const currentPageSize = () =>
  createSelector(stateSelector, (bstate) => bstate.currentPageSize);
