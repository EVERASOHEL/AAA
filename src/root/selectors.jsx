import {createSelector} from "reselect";
import {pageName} from "./constants";

const userState = (state) => state[pageName];

export const getException = () =>
    createSelector(userState, (bstate) => bstate.businessException);

export const getSideBarShow = () =>
    createSelector(userState, (bstate) => bstate.sidebarShow);

export const getRootDialogDTO = () =>
    createSelector(userState, (bstate) => bstate.rootDialogDTO);

//-------------------------------------------------------------------------------

export const isUserAuthenticated = () =>
    createSelector(userState, (bstate) => bstate.isUserAuthenticated);

export const isLoading = () =>
    createSelector(userState, (bstate) => {
        return bstate.fetchInitiated === true && bstate.fetchCompleted === false;
    });
