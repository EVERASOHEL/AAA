import { ActionTypes } from "./LoginConstants";

export function getFetchRequestedAction() {
  return {
    type: ActionTypes.FETCH_INITIATED,
  };
}

export function getFetchCompletedAction() {
  return {
    type: ActionTypes.FETCH_COMPLETED,
  };
}

export function getUnauthenticatedRequestAction() {
  return {
    type: ActionTypes.UNAUTHENTICATED_REQUEST,
  };
}
