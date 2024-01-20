import keyMirror from "fbjs/lib/keyMirror";

export const ActionTypes = keyMirror({
  EXCEPTION: undefined,
  USER_LOGIN_SUCCESS: undefined,
  USER_LOGIN_FAILURE: undefined,
  USER_LOGOUT: undefined,
  USER_LOGOUT_SUCCESS: undefined,
  USER_LOGOUT_FAILURE: undefined,
  FETCH_INITIATED: undefined,
  FETCH_COMPLETED: undefined,
  BUSINESS_EXCEPTION: undefined,
  UNKNOWN_ERROR: undefined,
  UNAUTHENTICATED_REQUEST: undefined,
  USER_CREATED: undefined,
  USER_PLAN_CHANGED_SUCCESSFULLY: undefined,
  RESET_PLAN_CHANGED_STATUS: undefined,
});

export const toast_your_account_blocked =
  "Your account is blocked, contact administrator";
export const toast_invalid_username_password = "Invalid username or password";
export const toast_forgot_password =
  "Password reset successfully.Please check your registered email address for new password.";
export const toast_company_dose_not_exist =
  "Company does not exist";
