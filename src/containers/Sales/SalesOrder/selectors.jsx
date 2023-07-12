import {createSelector} from "reselect";
import {pageName} from "./constants";

const stateSelector = (state) => state[pageName];

export const getClassDTO = () =>
    createSelector(stateSelector, (bstate) => bstate.classDTO);

export const getResponseDTO = () =>
    createSelector(stateSelector, (bstate) => bstate.responseDTO);
