import {createSelector} from "reselect";
import {pageName} from "./constants";

const stateSelector = (state) => state[pageName];

export const getClassDTO = () =>
    createSelector(stateSelector, (bstate) => bstate.classDTO);

export const list = () =>
    createSelector(stateSelector, (bstate) => bstate.list);
  
export const currentPage = () =>
  createSelector(stateSelector, (bstate) => bstate.currentPage);
  
export const currentPageSize = () =>
  createSelector(stateSelector, (bstate) => bstate.currentPageSize);

export const getFilterData = () =>
  createSelector(stateSelector, (bstate) => bstate.filters);

export const getSelectedFilters = () =>
  createSelector(stateSelector, (bstate) => bstate.selectedFilters);
