import { createSelector } from "reselect";
import { pageName } from "./constants";

const stateSelector = (state) => state[pageName];

export const getClassDTO = () =>
  createSelector(stateSelector, (bstate) => bstate.classDTO);

export const open = () =>
  createSelector(stateSelector, (bstate) => bstate.open);

export const modelmessage = () =>
  createSelector(stateSelector, (bstate) => bstate.modelmessage);

export const vendorcustomerAmountData= () =>
  createSelector(stateSelector, (bstate) => bstate.vendorcustomerAmountData);
