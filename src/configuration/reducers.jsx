/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from "@reduxjs/toolkit";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export const createReducer = (injectedReducers = {}) => {
    // Initially we don't have any injectedReducers, so returning identity function to avoid the error
    console.log("createReducer");
    if (Object.keys(injectedReducers).length === 0) {
        return (state) => state;
    } else {
        return combineReducers({
            ...injectedReducers,
        });
    }
};
