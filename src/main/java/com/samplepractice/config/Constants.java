package com.samplepractice.config;

public class Constants {

    //
    public static final String IGST5 = "IGST5[5%]";
    public static final String IGST12 = "IGST12[12%]";
    public static final String IGST18 = "IGST18[18%]";
    public static final String IGST28 = "IGST28[28%]";

    public static final String LGST5 = "LGST5[5%]";
    public static final String LGST12 = "LGST12[12%]";
    public static final String LGST18 = "LGST18[18%]";
    public static final String LGST28 = "LGST28[28%]";

    public static final String CUSTOMER = "Customer";
    public static final String VENDOR = "Vendor";

    public static final String STATUS_ACTIVE = "Active";

    public static final String LEAVE = "Leave";

    public static final String STATUS_INACTIVE = "Inactive";

    public static final String REMARKS_DRAFT = "DRAFT";

    public static final String STATUS_PENDING = "Pending";

    public static final String EXTRA_WORKING_REQUEST_EXIST = "Extra working request already exist";

    public static final String STATUS_PENDING_CORRECTION_MSG = "You can not apply for correction as request for same date is pending for approval";

    public static final String STATUS_SUCCESS = "Success";

    public static final String STATUS_FAILURE = "Failure";

    public static final String OLD_NEW_PASSWORD_MATCH = "Old Password and new Password must be different";

    public static final String PASSWORD_NOT_START_WITH = "Password must not be start with @ and =";

    public static final String STATUS_APPROVE = "Approve";

    public static final String STATUS_REJECT = "Reject";

    public static final String STATUS_DRAFT = "save";

    public static final String STATUS_REVOKED_PULL_BACK = "Revoked/Pull Back";

    public static final String STATUS_FREEZED = "freezed";

    public static final String STATUS_FREEZED_WITH_MSG = "Can not apply, attendance for requested date is freezed";

    public static final String STATUS_SHIFT = "shift";

    public static final String STATUS_LCR_LIMIT = "Requested time crosses limit - limit is ";

    public static final String STATUS_EGR_LIMIT = "Requested time crosses limit - limit is ";

    public static final String STATUS_EGR_OR_LCR = "EGR/LCR";

    public static final String STATUS_OVERLAPPING = "overlapping";

    public static final String STATUS_NOT_INSERTED = "Not Inserted";

    public static final String STATUS_LCR_OR_EGR_OUT_OF_SHIFT_RANG = "You must apply LCR/EGR between shift timing";

    public static final String STATUS_LCR_OR_EGR_OFF_DAY_HOLIDAY = "Can not apply LCR/EGR/Time Off on Offday/Holiday";

    public static final String STATUS_DATE_NOT_EXIST = "Date not exist";

    public static final String STATUS_NONWORKINGTYPE = "nonworkingday";

    public static final String ATTENDANCE_DATE_NOT_EXIST = "Attendance date not exist";

    public static final String STATUS_BETWEEN_SHIFTTIME = "Time is between shift time";

    public static final String STATUS_BETWEEN_NEXT_SHIFTTIME = "Time is between next shift time";

    public static final String STATUS_BETWEEN_PREVIOUS_SHIFTTIME = "Time is between previous shift time";

    public static final String STATUS_ALLOWED_BEFORE_SHIFTTIME = "Overtime is allowed before shift time";

    public static final String STATUS_ALLOWED_AFTER_SHIFTTIME = "Overtime is allowed after shift time";

    public static final String STATUS_NOT_ALLOWED_IF_AUTO_PRESENT = "Extra working is not allowed if shift is auto-present";

    public static final String STATUS_NOT_ALLOWED_IF_FLEXIBLE = "Extra working is not allowed if shift is flexible";

    public static final String STATUS_NOT_ELIGIBLE = "You are not eligible for extra working application";

    public static final String STATUS_SHIFT_NOT_ASSIGN = "Shift is not assigned";

    public static final String STATUS_INTIME_NOT_EXIST_FOR_REQUEST_DATE = "In time does not exist for requested date";

    public static final String STATUS_OUTTIME_NOT_EXIST_FOR_REQUEST_DATE = "Out time does not exist for requested date";

    public static final String STATUS_CORECTION_EXIST_SAME_TIME = "Correction Request exist with same time and date";

    public static final String STATUS_LEAVE_EXIST_SAME_TIME = "Leave exist with same time and date";

    public static final String STATUS_PRESENCE_TIME_EXIST_TIME = "Present on given time";

    public static final String STATUS_ATTENDANCE_PRESENCE_TIME_EXIST_TIME = "Attendance already exist on given time";

    public static final String STATUS_LEAVE_PENDING_EXIST_SAME_TIME = "Leave pending with same time and date";

    public static final String STATUS_REGULARIZATION_PENDING_EXIST_SAME_TIME = "Regularization pending with same time and date";

    public static final String STATUS_REGULARIZATION_EXIST_SAME_TIME = "Regularization exist with same time or date";

    public static final String STATUS_CORRECTION_PENDING_EXIST_SAME_TIME = "Correction pending with same time and date";

    public static final String STATUS_INTIME_EXIST_FOR_REQUEST_DATE = "In Time Exist For Request date";

    public static final String STATUS_WORKING_DAY = "You can not apply for correction request on non working day";

    public static final String STATUS_LEAVE_DAY = "Request not apply on not leave";

    public static final String STATUS_LEAVE_PENDING_DAY = "Leave pending on same time and date";

    public static final String STATUS_OUTTIME_EXIST_FOR_REQUEST_DATE = "Out Time Exist For Request Date";

    public static final String STATUS_INTIME_MUST_BE_LATER_THAN_OUTTIME = "In time must be later than out time";

    public static final String STATUS_INTIME_MUST_BE_GREATER_THAN_OUTTIME = "In time must be greater than previous day out time";

    public static final String STATUS_OUTTIME_MUST_BE_LATER_THAN_NEXTDAY_INTIME = "Out time must be later than next day In time";

    public static final String STATUS_CAN_NOT_APPLY_REQUEST_FOR_FUTURE_INTIME = "Can not apply request for future in time";

    public static final String STATUS_CAN_NOT_APPLY_REQUEST_FOR_FUTURE_Date = "Can not apply request for future date";

    public static final String COFF_LEAVE_REQUEST_EXIST_FOR_APPLY_DATE = "Leave/Coff request already exists for requested date";

    public static final String STATUS_LCR_EGR_LIMIT = "Balance not exist for EGR/LCR/Time Off";

    public static final String EXIT_INTERVIEW = "Exit Interview";

    public static final String DEPARTMENT_CLEARANCE = "Department Clearance";

    public static final String DEPARTMENT_CLEARANCE_REDIRECT = "#/departmentClearance";

    public static final String CLEAR = "Clear";

    //Regularization RequestTypes
    public static final String STATUS_LATE_COMING_REQUEST = "Late Coming Request";

    public static final String STATUS_EARLY_GOING_REQUEST = "Early Going Request";

    public static final String STATUS_WORK_FROM_HOME = "Work From Home";

    public static final String STATUS_ON_TOUR = "On Tour";

    public static final String STATUS_TRAINING = "Training";

    public static final String STATUS_TRAIN = "TRAINING";

    public static final String STATUS_OFFICAIL_WORK = "official work";

    public static final String STATUS_TIME_OFF = "Time Off";

    public static final String STATUS_WFH = "WFH";

    public static final String STATUS_OW = "OW";

    public static final String STATUS_TOUR = "TOUR";

    public static final String STATUS_REG_TO = "TO";

    // Response Status Message
    public static final String UNAUTHORIZE = "UNAUTHORIZE";

    public static final String BAD_CREDENTIAL = "BAD_CREDENTIAL";

    public static final String BAD_REQUEST = "BAD_REQUEST";

    public static final String REQUEST_SUCCESS = "REQUEST_SUCCESS";

    public static final String PUNCH_FAILED = "You Are Out Of Punching Range";

    // In Out Punch Request Type Name
    public static final String INPUNCH = "In Punch Correction";

    public static final String OUTPUNCH = "Out Punch Correction";

    public static final String INOUTPUNCH = "In Out Punch Correction";

    public static final String PUNCH_IN_OUT_SUCCESSFULLY = "Punch In Out Successfully";

    // Request Type
    public static final String ATTENDANCECORRECTIONREQUEST = "AttendanceCorrectionRequest";

    public static final String REGULARIZATIONREQUEST = "RegularizationRequest";

    // Mode
    public static final String MODEA = "ModeA";

    public static final String MODEB = "ModeB";

    public static final String MODEC = "ModeC";

    public static final String MODED = "Mode D";

    public static final String ATTENDANCE_REGULARIZATION = "Attendance Regularization";

    public static final String ATTENDANCE_CORRECTION = "Attendance Correction";

    public static final String COFF = "Compensatory Off Application";

    public static final String CHANGE_PASSWORD = "change password";

    public static final String EXTRAWORKING = "ExtraWorking";

    public static final String COFF_REQUEST_SUBJECT = "Compensatory Off Application Request";

    public static final String COFF_REQUEST_SUBJECT_FCM_NAVIGATION = "#/compensatoryOff/approval";

    public static final String CHANGE_PASSWORD_SUBJECT = "Change Password";

    public static final String FORGOT_PASSWORD_SUBJECT = "Forgot Password";

    public static final String FORGOT_PASSWORD_TEMPLATE = "forgot_password";

    public static final String FORGOT_PASSWORD_CATEGORY = "forgot_password";

    public static final String COFF_APPROVAL_SUBJECT = "Compensatory Off Application Request Status Update";

    public static final String COFF_APPROVAL_SUBJECT_FCM_NAVIGATION = "#/compensatoryOff/list";

    public static final String ATTENDANCE_REGULARIZATION_REQUEST_SUBJECT = "Attendance Regularization Request";

    public static final String ATTENDANCE_REGULARIZATION_REQUEST_SUBJECT_FCM_NAVIGATION = "#/regularization/approval";

    public static final String ATTENDANCE_REGULARIZATION_APPROVER_SUBJECT = "Attendance Regularization Request Status Update";

    public static final String ATTENDANCE_REGULARIZATION_APPROVER_SUBJECT_FCM_NAVIGATION = "#/regularization/list";

    public static final String LEAVE_APPLICATION_APPROVER_SUBJECT = "Leave Application Request Status Update";

    public static final String LEAVE_APPLICATION_APPROVER_SUBJECT_FCM_NAVIGATION = "#/leave/list";

    public static final String LEAVE_CANCEL_APPLICATION_APPROVER_SUBJECT = "Leave Cancellation Request Status Update";

    public static final String LEAVE_CANCEL_BY_ADMIN_SUBJECT = "Leave Status Update";

    public static final String LEAVE_CANCEL_APPLICATION_APPROVER_SUBJECT_FCM_NAVIGATION = "#/leaveCancellation/list";

    public static final String EXTRAWORKING_REQUEST_SUBJECT = "Extra Working Request";

    public static final String EXTRAWORKING_REQUEST_SUBJECT_FCM_NAVIGATION = "#/extraWorking/approval";

    public static final String EXTRAWORKING_APPROVER_SUBJECT = "Extra Working Request Status Update";

    public static final String EXTRAWORKING_APPROVER_SUBJECT_FCM_NAVIGATION = "#/extraWorking/list";

    public static final String ATTENDANCE_CORRECTION_REQUEST_SUBJECT = "Attendance Correction Request";

    public static final String ATTENDANCE_CORRECTION_REQUEST_SUBJECT_FCM_NAVIGATION = "#/correction/approval";

    public static final String ATTENDANCE_CORRECTION_APPROVER_SUBJECT = "Attendance Correction Request Status Update";

    public static final String ATTENDANCE_CORRECTION_APPROVER_SUBJECT_FCM_NAVIGATION = "#/correction/list";

    public static final String ATTENDANCE_SHORT_FALL = "Attendance Missing";

    public static final String ATTENDANCE_SHORT_FALL_REDIRECT = "#/attendance/month";

    public static final String ATTENDANCE_SHORT_FALL_EMAIL_CATEGORY = "attendance_short_fall";

    public static final String ATTENDANCE_SHORT_FALL_REDIRECT_FCM_NAVIGATION = "#/attendance/punch";

    public static final String PMS_GOAL_FCM_NAVIGATION = "#/pms/goal";

    public static final String PMS_REVIEW_FCM_NAVIGATION = "#/pms/review";

    public static final String EDIT_PROFILE_FCM_NAVIGATION = "#/editProfile/subsection-0";

    public static final String STATUS_APPROVED = "Approved";

    public static final String STATUS_CANCELLED = "Cancelled";

    public static final String LEAVE_APPLICATION_APPROVAL = "Leave Application";

    public static final String LEAVE_CANCEL_APPLICATION_APPROVAL = "leave cancel application";

    public static final String STATUS_REJECTED = "Rejected";

    public static final String ATTENDANCE_REQUEST_REDIRECT = "#/correction/approval";

    public static final String ATTENDANCE_REGULARIZATION_REDIRECT = "#/regularization/approval";

    public static final String EXTRAWORKING_REDIRECT = "#/extraWorking/approval";

    public static final String COFF_APPLICATION_REDIRECT = "#/compensatoryOff/approval";

    public static final String EXPENSE_REDIRECT = "#/expense/approval";

    public static final String EXPENSE_APPROVER_SUBJECT = "Expense Request Status Update";

    public static final String EXPENSE_CLAIM_APPROVER_SUBJECT = "Expense Claim Request Status Update";

    public static final String EXPENSE_CLAIM_APPROVER_STATUS = "Expense claim ";

    public static final String EXPENSE_PAYMENT_STATUS_SUBJECT = "Expense Payment Status Update";

    public static final String EXPENSE_APPROVER_SUBJECT_FCM_NAVIGATION = "#/expense/list";

    public static final String RESIGNATION_APPROVER_SUBJECT = "Resignation Request Status Update";

    public static final String RESIGNATION_APPROVER_SUBJECT_FCM_NAVIGATION = "#/resignation/list";

    public static final String EXPENSE = "Expense";

    public static final String RESIGNATION = "Resignation";

    public static final String RESIGNATION_REDIRECT = "#/separation/approval";

    public static final String LEAVE_REQUEST_REDIRECT = "#/leave/application/list";

    public static final String LEAVE_CANCEL_REQUEST_REDIRECT = "#/leaveCancellation/approval";

    public static final String PROBATION_REDIRECT = "#/confirmation/pendingReview";

    public static final String TDS_WINDOW_OPEN = "TDS Window - Open";

    public static final String TDS_WINDOW_CLOSE = "TDS Window - Close";

    public static final String TDS_WINDOW_MAIL_TEMPLATE_OPEN = "tds_cycle_open";

    public static final String TDS_WINDOW_MAIL_TEMPLATE_CLOSE = "tds_cycle_close";

    public static final String TDS_FCM_OPEN_TITLE = "TDS Window - Open";

    public static final String TDS_FCM_CLOSE_TITLE = "TDS Window - Close";

    public static final String TDS_FCM_CLOSE_BODY = "Hello ||EMPLOYEE_NAME||,\nThe Tax Declaration Submission window is closed.";

    public static final String TDS_FCM_OPEN_BODY = "Hello ||EMPLOYEE_NAME||,\nThe Tax Declaration Submission window is open.";

    public static final String TDS_NOT_APPLICABLE = "TDS not Applicable to you";

    //Data Request Type
    public static final String LIST = "List";

    public static final String APPROVAL = "Approval";

    //Data Request Type
    public static final String LIST_SMALL = "list";

    public static final String APPROVAL_SMALL = "approval";

    //True / False Constant
    public static final Boolean TRUE = true;

    public static final Boolean FALSE = false;

    public static final String TRUE_STRING = "true";

    public static final String FALSE_STRING = "false";

    public static final String YES = "Yes";

    public static final String NO = "No";

    //Full or Half Constants
    public static final String FULL = "Full";

    public static final String HALF = "Half";

    public static final String FIRST_HALF = "First Half";

    public static final String SECOND_HALF = "Second Half";

    public static final String FIRST = "First";

    public static final String SECOND = "Second";

    public static final String COFF_DAILYATTENDNACE = "C-Off";

    public static final String HTML_EXTENSION = ".html";

    public static final String TEXT_EXTENSION = ".txt";

    //public static final String RESOURCE_PATH = "d:/documents/templates/";
    public static final String RESOURCE_PATH = "/documents/templates";

    public static final String TDS_PATH = "/documents/tds";

    public static final String TDS_EXCEL_PATH = TDS_PATH + "/TaxCalc_2021.xlsx";

    public static final String TDS_EXCEL_PATH_NEW = TDS_PATH + "/TaxCalc_";

    public static final String XLSX_FILE_EXENSION = ".xlsx";

    public static final String SALARY_SLIP_ADDITION = "Addition";

    public static final String SALARY_SLIP_DEDUCTION = "Deduction";

    public static final String TDS_SHEET_IT = "IT ";

    public static final String HTTPS = "https://";
    //email constants

    public static final String APPROVE_EMAIL_CATEGORY = "approve_email";

    public static final String REJECT_EMAIL_CATEGORY = "reject_email";

    public static final String REUQEST_EMAIL_CATEGORY = "request_email";

    public static final String COFF_REQUEST = "coff_request";

    public static final String DEPARTMENT_TRACK_EMAIL = "departmentClearance_track_email";

    public static final String CORRECTION_APPROVE_EMAIL_CATEGORY = "correction_approve_email";

    public static final String CORRECTION_REUQEST_EMAIL_CATEGORY = "correction_request_email";

    public static final String CORRECTION_REJECT_EMAIL_CATEGORY = "correction_reject_email";

    public static final String SHIFT_NOT_ASSIGNED_MAIL = "shift_not_assigned_error_mail";

    public static final String SALARY_SLIP = "salary_slip";

    public static final String REQUEST_TEMPLATE = "request_email.html";

    public static final String LEAVE_REQUEST_TEMPLATE = "leave_request";

    public static final String LEAVE_APPLICATION = "Leave Application Request";

    public static final String LEAVE_CANCEL_APPLICATION = "Leave Application Cancel Request";

    public static final String LEAVE_REQUEST_TYPE = "leave_request";

    public static final String LEAVE_REQUEST_CATEGORY = "leave_request";

    public static final String LEAVE_REQUEST_SUBJECT = "Leave Application Request";

    public static final String LEAVE_CANCEL_ADMIN_MAIL = "leave_cancel_admin";

    public static final String LEAVE_REQUEST_SUBJECT_FCM_NAVIGATION = "#/leave/approval";

    public static final String LEAVE_REQUEST_CANCEL_SUBJECT = "Leave Cancel Application Request";

    public static final String LEAVE_REQUEST_CANCEL_SUBJECT_FCM_NAVIGATION = "#/leaveCancellation/approval";

    public static final String CORRECTION_REQUEST_TEMPLATE = "correction_request_email.html";

    public static final String CORRECTION_REQUEST_TYPE = "correction_request_email";

    public static final String CORRECTION_APPROVE_TEMPLATE = "correction_approve_email.html";

    public static final String CORRECTION_REJECT_TEMPLATE = "correction_reject_email.html";

    public static final String CORRECTION_APPROVE_TYPE = "correction_request_email";

    public static final String CORRECTION_REJECT_TYPE = "correction_reject_email";

    public static final String REQUEST_TYPE = "request_email";

    public static final String FORGOT_PASSWORD_TYPE = "forgot_password";

    public static final String APPROVAL_TEMPLATE = "approve_email.html";

    public static final String APPROVAL_TYPE = "approve_request_email";

    public static final String REJECT_TEMPLATE = "reject_email.html";

    public static final String REJECT_TYPE = "reject_request_email";

    public static final String REQUEST_METHOD_TYPE = "request_method";

    public static final String APPROVE_REJECT_METHOD_TYPE = "approve_reject_method";

    public static final String EXPENSE_REQUEST = "Expense Request";

    public static final String EXPENSE_REQUEST_SUBJECT = "Expense Request";

    public static final String EXPENSE_CLAIM_SUBMITTED = "Expense Claim Submitted";

    public static final String EXPENSE_CLAIM_PENDING_FOR_APPROVAL = "Expense Claim Pending For Approval";

    public static final String EXPENSE_REQUEST_SUBJECT_FCM_NAVIGATION = "#/expense/approval";

    public static final String EXPENSE_REQUEST_CATEGORY = "expense_request_email";

    public static final String EXPENSE_REQUEST_EMPLOYEE_CATEGORY = "expense_request_employee_email";

    public static final String EXPENSE_APPROVE_REJECT_CATEGORY = "expense_claim_approve_email";

    public static final String EXPENSE_REQUEST_TYPE = "expense_request_email";

    public static final String EXPENSE_PAYMENT_BUNCH = "expense_payment_bunch";

    public static final String DAILY_GEO_FENCING_REPORT = "Daily Geo-Fencing Report";

    public static final String REIMBURSEMENT_CLAIM_REQUEST = "reimbursement claim request";

    public static final String REIMBURSEMENT_CLAIM_REQUEST_SUBJECT = "Reimbursement Claim Request";

    public static final String REIMBURSEMENT_CLAIM_REQUEST_REDIRECT = "#/reimbursement-claim/approval";

    public static final String REIMBURSEMENT_CLAIM_REQUEST_CATEGORY = "reimbursement_claim_request_email";

    public static final String REIMBURSEMENT_CLAIM_REQUEST_TYPE = "reimbursement_claim_request_email";

    public static final String UPDATE_REIMBURSEMENT_CLAIM_REQUEST = "updated reimbursement claim request";

    public static final String UPDATE_REIMBURSEMENT_CLAIM_REQUEST_SUBJECT = "Update Reimbursement Claim Request";

    public static final String APPROVAL_REIMBURSEMENT_CLAIM_REQUEST = "approval reimbursement claim request";

    public static final String APPROVAL_REIMBURSEMENT_CLAIM_REQUEST_SUBJECT = "Approval Reimbursement Claim Request";

    public static final String APPROVAL_REIMBURSEMENT_CLAIM_REQUEST_CATEGORY = "approval_reimbursement_claim_request_email";

    public static final String APPROVAL_REIMBURSEMENT_CLAIM_REQUEST_TYPE = "approval_reimbursement_claim_request_email";

    public static final String APPROVAL_REIMBURSEMENT_CLAIM_REQUEST_REDIRECT = "#/reimbursement-claim/list";

    public static final String RESIGNATION_REQUEST_SUBJECT = "Resignation Request";

    public static final String RESIGNATION_REQUEST_SUBJECT_FCM_NAVIGATION = "#/resignation/approval";

    public static final String RESIGNATION_REQUEST = "Resignation Request";

    public static final String RESIGNATION_REQUEST_CATEGORY = "resignation_request_email";

    public static final String RESIGNATION_REQUEST_TYPE = "resignation_request_email";

    public static final String EDIT_PROFILE_CATEGORY = "edit_profile_email";

    public static final String RESIGNATION_REVOKE_EMAIL = "resignation_revoke_email";

    public static final String DEPARTMENT_CLEARANCE_EMAIL = "department_clearance_email";

    public static final String PROBATION_CONFIRMATION_CATEGORY = "probation_confirmation_mail";

    public static final String PROBATION_CONFIRMATION_REQUEST_TYPE = "probation_confirmation_mail";

    public static final String COMMON_NOTIFICATION_MAIL_CATEGORY = "common_notification_mail";

    public static final String COMMON_NOTIFICATION_MAIL_REQUEST_TYPE = "common_notification_mail";

    public static final String EDIT_PROFILE_REQUEST_TYPE = "edit_profile_email";

    public static final String EDIT_PROFILE_SUBJECT = "Edit profile request";

    public static final String RESIGNATION_REVOKE = "Resignation Pull Back";

    public static final String PROBATION_MAIL_SUBJECT = "Confirmation due list";

    public static final String PROBATION_CONFIRMATION_MAIL = "Probation confirmation email";

    public static final String BIRTHDAY_NOTIFICATION_LIST = "Birthday list";

    public static final String NEWJOINEE_NOTIFICATION_LIST = "Joined employee list";

    public static final String ANNIVERSARY_NOTIFICATION_LIST = "Work anniversary list";

    public static final String APPRAISAL_NOTIFICATION_LIST = "Appraisal due list";

    public static final String EDIT_PROFILE_APPROVAL_CATEGORY = "edit_profile_approval_email";

    public static final String EDIT_PROFILE_APPROVAL_FCM_CATEGORY = "edit_profile_approval_fcm";

    public static final String GEO_LOCATION_SELF = "geo_location_self";

    public static final String GEO_LOCATION_MANAGER_OTHER = "geo_location_manager_other";

    public static final String EDIT_PROFILE_APPROVAL_TYPE = "edit_profile_approval_email";

    public static final String SOMETHING_WENT_WRONG_MAIL = "something_went_wrong_mail";

    public static final String EDIT_PROFILE_APPROVAL_SUBJECT = "Edit profile approval request";

    public static final String SHORTFALL_SUBJECT = "Working Hour Shortfall";

    public static final String EGR_LCR_SUBJECT = "Late Coming/Early Going Warnings";

    public static final String PENALTY_SUBJECT = "Penalty Warning";

    public static final String PUNCH_IN_OUT_SUBJECT = "In Punch - Out Punch Missing";

    public static final String SHORTFALL_FLEXIBLE_SUBJECT = "Working Hour Shortfall (Flexible Work-Schedule)";

    public static final String SHORTFALL_REQUEST_TYPE = "working hour shortfall";

    public static final String EGR_LCR_REQUEST_TYPE = "late coming-early going warnings";

    public static final String PENALTY_REQUEST_TYPE = "penalty warning";

    public static final String PUNCH_IN_OUT_REQUEST_TYPE = "in punch - out punch missing";

    public static final String ATTENDANCE_MAIL_TEMPLATE_STRING = "AttendanceMailTemplate";

    public static final String PERSONAL_DETAILS_REQUEST_TYPE = "Personal Details";

    public static final String NOMINEE_DETAILS_REQUEST_TYPE = "Nominee Details";

    public static final String BANK_DETAILS_REQUEST_TYPE = "Bank Details";

    public static final String ABOUT_SELF_DETAILS_REQUEST_TYPE = "Self Details";

    public static final String EMERGENCY_DETAILS_REQUEST_TYPE = "Emergency Details";

    public static final String ADDRESS_DETAILS_REQUEST_TYPE = "Address Details";

    public static final String CONTACT_DETAILS_REQUEST_TYPE = "Contact Details";

    public static final String RELATION_DETAILS_REQUEST_TYPE = "Relation Details";

    public static final String FAMILY_DETAILS_REQUEST_TYPE = "Family Details";

    public static final String QUALIFICATION_DETAILS_REQUEST_TYPE = "Qualification Details";

    public static final String LANGUAGE_DETAILS_REQUEST_TYPE = "Language Details";

    public static final String CERTIFICATE_DETAILS_REQUEST_TYPE = "Certificate/Training Details";

    public static final String DOCUMENT_DETAILS_REQUEST_TYPE = "Document Details";

    public static final String REFERENCES_DETAILS_REQUEST_TYPE = "References Details";

    public static final String GUARANTORS_DETAILS_REQUEST_TYPE = "Guarantors Details";

    public static final String IMMIGRATION_DETAILS_REQUEST_TYPE = "Passport/Visa Details";

    public static final String EXPERIENCE_DETAILS_REQUEST_TYPE = "Experience Details";

    public static final String SUGGESTION_SUBJECT = "Suggestion request";

    public static final String SUGGESTION_CATEGORY = "suggestion_email";

    public static final String SUGGESTION_REQUEST_TYPE = "suggestion_email";

    public static final String SUGGESTION_DETAILS_REQUEST_TYPE = "Suggestion";

    public static final String PROBATION_SUBJECT = "Probation Review";

    public static final String PROBATION_REQUEST_TYPES = "Probation Review";

    public static final String PROBATION_PROCESS_SUBJECT = "Probation Review";

    public static final String PENDING_PROBATION_REVIEW = "Pending Probation Review";

    public static final String PROBATION_PROCESS_REDIRECT = "#/confirmation/pendingReview";

    public static final String PROBATION_PROCESS_CATEGORY = "under_probation_list_email";

    public static final String CONFIRMATION_NOTIFICATION_SEND_REMINDER_CATEGORY = "confirmation_notification_send_reminder";

    public static final String PROBATION_PROCESS_TYPE = "under_probation_list_email";

    public static final String CONFIRMATION_NOTIFICATION_SEND_REMINDER_TYPE = "confirmation_notification_send_reminder";

    public static final String FCM_FOR_REPORTING = "Hi, Probation review process is due for ";

    public static final String FCM_FOR_EMPLOYEE = "Your probation review is due for self assessment.";

    public static final String PROBATION_REQUEST_CATEGORY = "probation_process_email";

    public static final String TEMP_ATTENDANCE = "temp_attendance";

    public static final String PROBATION_REQUEST_TYPE = "probation_process_email";

    public static final String EXTRAWORKING_MODEL = "com.xmplify.hris.tenant.model.EmployeeExtraWorkingCoffApplication";

    public static final String COFF_MODEL = "com.xmplify.hris.tenant.model.CompensatoryOffApplication";

    public static final String LEAVE_APPLICATION_MODEL = "com.xmplify.hris.tenant.model.LeaveApplicationHeader";

    public static final String DOCUMENT_INVALID_FORMAT = "Invalid format of document";

    public static final String EMPLOYEE_DATA_NOT_EXIST = "Employee data not exist";

    public static final String COFF_OFF_DAYS_NOT_APPLIED = "You can not apply request on offday";

    public static final String COFF_HOLIDAYS_DAYS_NOT_APPLIED = "You can not apply request on holidays";

    public static final String CORRECTION_DAILY_ATTENDANCE = "Correction";

    public static final String X_TOTAL_COUNT = "X-Total-Count";

    public static final String ACCESS_CONTROL_EXPOSE_HEADERS = "Access-Control-Expose-Headers";

    public static final String SUGGESTION_MAIL_SUBJECT = "Suggestion by employee";

    public static final String IT_LOOKS_LIKE_YOU_HAVE_NOT_MADE_ANY_CHANGES = "It looks like you haven't made any changes";

    public static final String MAIL = "MAIL";

    public static final String FCM = "FCM";

    public static final String PDF = "PDF";

    public static final String FCM_BODY = "fcmBody";

    public static final String FCM_TITLE = "fcmTitle";

    public static final String TYPE = "||type||";

    public static final String HOURS_NOT_COMPLETED = "Short Working Hours";

    public static final String PUNCH_IN_OUT_MISSING = "In-Punch & Out-punch Missing";

    public static final String PUNCH_IN_MISSING = "In-Punch Missing";

    public static final String PUNCH_OUT_MISSING = "Out-Punch Missing";

    public static final String CREATED = "Created Successfully";

    public static final String UPDATED = "Updated Successfully";

    public static final String DELETED = "Deleted Successfully";

    public static final String PROBATION_CONFIRMATION = "PROBATION_CONFIRMATION";

    public static final String PROBATION_CONFIRMATION_EMAIL = "PROBATION_CONFIRMATION_EMAIL";

    public static final String PROBATION_CONFIRMATION_EMAIL_SUCCESS = "PROBATION_CONFIRMATION_EMAIL_SUCCESS";

    public static final String MULTIPLE_PUNCH = "MULTIPLE_PUNCH";

    public static final String LEAVE_BALANCE = "LEAVE_BALANCE";

    public static final String AUTO_EXPENSE = "AUTO_EXPENSE";

    public static final String ATTENDANCE_PROCESS = "ATTENDANCE_PROCESS";

    public static final String ATTENDANCE_NOTIFICATION = "ATTENDANCE_NOTIFICATION";

    public static final String TDS_CYCLE_OPEN_CLOSE = "TDS_CYCLE_OPEN_CLOSE";

    public static final String PMS_CYCLE_OPEN_CLOSE = "PMS_CYCLE_OPEN_CLOSE";

    public static final String REQUEST_SUBMITTED_MSG = "Request submitted successfully";

    public static final String TICKET_REMINDER = "TICKET_REMINDER";

    public static final String TDS_CALCULATE_AFTER_SALARY_PROCESSED = "TDS_CALCULATE_AFTER_SALARY_PROCESSED";

    public static final String CONSOLIDATE_EXCEL_REPORT = "CONSOLIDATE_EXCEL_REPORT";

    public static final String EMPLOYEE_PROMOTION = "EMPLOYEE_PROMOTION";

    public static final String SINGLE_EMPLOYEE_TRANSFER = "SINGLE_EMPLOYEE_TRANSFER";

    public static final String TEAM_EMPLOYEE_TRANSFER = "TEAM_EMPLOYEE_TRANSFER";

    public static final String NEW_ATTENDANCE_CALANDER_GENERATION = "NEW_ATTENDANCE_CALANDER_GENERATION";

    public static final String DEPT_CLEARANCE_INITIATION = "DEPT_CLEARANCE_INITIATION";
    //Approve Reject Request Messages

    public static final String REQUEST_APPROVED_MSG = "Request approved successfully";

    public static final String REQUEST_REJECTED_MSG = "Request rejected successfully";

    public static final String REQUEST_REVOKED_PULL_BACK_MSG = "Request revoked/pull back successfully";

    public static final String EXACT_MATCH = "EXACT_MATCH";

    public static final String WEIGHTAGE_NOT_SUFFICIENT = "Total weight insufficient for ";

    public static final String KRA_ADDED_SUCCESS = "KRA added successfully.";

    public static final String GOAL_LIST_ADDED = "Successfully updated goal list.";

    public static final String STAGE_SUBMIT = "Submit";

    public static final String REQUEST_UPDATED = "Request updated successfully";

    public static final String NO_DATA_FOUND = "No Data Found.";

    public static final String USER_CONFIRMATION = "USER_CONFIRMATION";

    public static final String EMPLOYEE_MOVEMENT_REGISTER_REPORT = "Employee Movement Register Report.";

    public static final String EMPLOYEE_MOVEMENT_DETAILS_REQUEST_TYPE = "Employee Movement Details";

    public static final String EMPLOYEE_MOVEMENT_REGISTER_REPORT_CATEGORY = "employee_movement_register_report_email";

    public static final String EEMPLOYEE_MOVEMENT_REGISTER_REPORT_TYPE = "employee_movement_register_report_email";

    public static final String EMPLOYEE_MOVEMENT_SUMMARY_REPORT = "Employee Movement Summary Report.";

    public static final String EMPLOYEE_MOVEMENT_SUMMARY_REPORT_CATEGORY = "employee_movement_summary_report_email";

    public static final String EEMPLOYEE_MOVEMENT_SUMMARY_REPORT_TYPE = "employee_movement_summary_report_email";

    public static final String EMPLOYEE_PF_ESIC_REGISTRATION_DETAILS_REQUEST_TYPE = "Employee PF-ESIC Registration Details.";

    public static final String EMPLOYEE_PF_DETAILS_REQUEST_TYPE = "Employee PF Details.";

    public static final String EMPLOYEE_DETAILED_INFORMATION_REPORT = "Employee Information Report.";

    public static final String EMPLOYEE_PF_ESIC_REGISTRATION_DETAILS_REPORT = "Employee PF-ESIC Registration Details Report.";

    public static final String ADMINISTRATOR = "Administrator";

    public static final String ON_BEHALF_OF_MANAGER = "on behalf of Manager";

    public static final String EMPTY_STRING = "";

    public static final String EMPLOYEE_ESIC_DETAILS_REQUEST_TYPE = "Employee ESIC Details.";

    public static final String EMPLOYEE_ESIC_DETAILS_REPORT = "Employee ESIC Details Report.";

    public static final String EMPLOYEE_PF_DETAILS_REPORT = "Employee PF Details Report.";

    //club egr lcr error
    public static final String CANNOT_APPLY_EGR_LCR_ON_SAME_DAY = "Can't apply early going and late coming on the same day";

    public static final String GEO_FENCING_PUSH_NOTIFICATION = "GEO_FENCING_PUSH_NOTIFICATION";

    public static final String GEO_FENCING_MAIL_NOTIFICATION = "GEO_FENCING_MAIL_NOTIFICATION";

    public static final String GPS_OFF_FCM_CONFIG_NAME = "gps_on_off";

    public static final String IDLE_FCM_CONFIG_NAME = "idle_at_one_location";

    public static final String GEO_FENCE_OUT_FCM_CONFIG_NAME = "geofence_out";

    public static final String FCM_CONFIG_NAME_ANNOUNCEMENT = "announcement_fcm";

    public static final String FCM_CONFIG_NAME_EVENT = "event_fcm";

    public static final String PUSH = "PUSH";

    public static final String EMAIL = "EMAIL";

    public static final String REGENERATE_APPLICABLE_CRITERIA = "REGENERATE_APPLICABLE_CRITERIA";

    public static final String ALLOCATE_LEAVE_EMPLOYEE_CONFIRMATION = "ALLOCATE_LEAVE_EMPLOYEE_CONFIRMATION";

    public static final String REGULARIZATION_APPROVAL = "Regularization request approved successfully";

    public static final String REGULARIZATION_REJECTION = "Regularization request rejected successfully";

    public static final String CORRECTION_APPROVAL = "Correction request approved successfully";

    public static final String CORRECTION_REJECTION = "Correction request rejected successfully";
    //new subject and title of regularization and correction

    public static final String REGULARIZATION_REJECTED_SUBJECT = "Attendance Regularization Rejected";

    public static final String REGULARIZATION_APPROVED_SUBJECT = "Attendance Regularization Approved";

    public static final String REGULARIZATION_CANCELLED_SUBJECT = "Attendance Regularization Cancelled";

    public static final String CORRECTION_REJECTED_SUBJECT = "Attendance Correction Rejected";

    public static final String CORRECTION_APPROVED_SUBJECT = "Attendance Correction Approved";

    public static final String CORRECTION_CANCELLED_SUBJECT = "Attendance Correction Cancelled";

    //changes success and failure message of punch in and out
    public static final String PUNCH_IN_SUCCESS = "Punch-In was successful";

    public static final String PUNCH_OUT_SUCCESS = "Punch-Out was successful";

    public static final String PUNCH_IN_FAILURE = "Punch-In failed";

    public static final String PUNCH_OUT_FAILURE = "Punch-Out failed";

    public static final String OFF_DAY = "OffDay";

    public static final String HOLIDAY = "Holiday";

    public static final String IN_OUT_PUNCH_TIME_ERROR = "You cannot apply request for future Out Time";

    public static final String RESET_PASSWORD_TEMPLATE_NAME = "resetPasswordMail";

    public static final String MOVE_TRACKING_DATA_NEW_TO_OLD = "MOVE_TRACKING_DATA_NEW_TO_OLD";

    public static final String MOVE_TRACKING_DATA_NEW_TO_OLD_WITH_DELETE_DUPLICATE = "MOVE_TRACKING_DATA_NEW_TO_OLD_WITH_DELETE_DUPLICATE";

    public static final String GENERATE_CALENDAR = "GENERATE_CALENDAR";

    public static final String ANNOUNCEMENT_NOTIFICATION = "ANNOUNCEMENT_NOTIFICATION";

    public static final String UPDATE_LOCATION_NAME = "UPDATE_LOCATION_NAME";

    public static final String SHIFT_START_NOTIFICATION = "SHIFT_START_NOTIFICATION";

    public static final String SHIFT_END_NOTIFICATION = "SHIFT_END_NOTIFICATION";

    public static final String GENERATE_LETTER_EMPLOYEE = "generateLetterEmployee";

    public static final String GENERATE_LETTER_Admin = "generateLetterAdmin";

    //PMS Status Report
    public static final String GOAL_REMINDER = "Goal Reminder";

    public static final String REVIEW_REMINDER = "Review Reminder";

    public static final String GOAL_REMINDER_SELF_MAIL = "pms_status_goal_self";

    public static final String REVIEW_REMINDER_SELF_MAIL = "pms_status_review_self";

    public static final String GOAL_REMINDER_MANAGER_MAIL = "pms_status_goal_manager";

    public static final String REVIEW_REMINDER_MANAGER_MAIL = "pms_status_review_manager";

    public static final String ATTENDANCE_PROCESS_ERROR_MAIL = "attendanceProcessError";

    public static final String SEPARATION_REQUEST_CATEGORY = "separation_request";

    public static final String SEPARATION_REQUEST_TYPE = "separation_request";

    public static final String SEPARATION_REQUEST = "Separation Request";

    public static final String SEPARATION_REVOKE_PULLBACK = "Separation Request Pull Back";

    public static final String SEPARATION_REVOKE_PULLBACK_TYPE = "separation_revoke_pull_back";

    public static final String SEPARATION_APPROVED = "Separation Request Approved";

    public static final String SEPARATION_REJECT = "Separation Request Rejected";

    public static final String SEPARATION_APPROVE_REJECT = "separation_approve_reject";

    public static final String CHECKLIST_COMPLETED = "Clearance Checklist Completed";

    public static final String CHECKLIST_COMPLETED_CATEGORY = "checklist_emp_submission";

    public static final String CHECKLIST_APPROVAL = "Clearance Approved";

    public static final String CHECKLIST_APPROVAL_CATEGORY = "clearance_approved";

    public static final String CHECKLIST_APPROVAL_REDIRECT = "#/clearance/list";

    public static final String EXIT_FEEDBACK_SUBJECT = "Exit Feedback";

    public static final String EXIT_INTERVIEW_CATEGORY = "exit_interview";

    public static final String EXIT_INTERVIEW_REDIRECT = "#/exitInterview";

    public static final String CLEARANCE_ASSIGNED = "Clearance Checklist Assigned";

    public static final String CLEARANCE_ASSIGNED_CATEGORY = "clearance_assigned";

    public static final String COMPOSE_EMAIL = "compose_email";

    public static final String UPDATE_PROBATION_DAYS_MAPPING = "UPDATE_PROBATION_DAYS_MAPPING";

    public static final String EMPLOYEE_CREATION_PROCESS = "EMPLOYEE_CREATION_PROCESS";

    public static final String RESET_USERDTO_MAP = "RESET_USERDTO_MAP";

    public static final String REGULARIZATION_MAPPING = "REGULARIZATION_MAPPING";

    public static final String PENDING_NOTIFICATION_APPROVAL = "PENDING_NOTIFICATION_APPROVAL";

    public static final String TMP_SCHEDULER = "TMP_SCHEDULER";

    public static final String PIP_SCHEDULER = "PIP_SCHEDULER";

    public static final String PIP_CREATION = "PIP Creation";

    public static final String PIP_COMMENTS = "PIP Comments Update";

    public static final String PIP_STATUS = "PIP Status Update";

    public static final String PIP_REVIEW_DUE_DATE_REMINDER = "PIP Form Review Date Reminder";

    public static final String PIP_CLOSURE_DATE_REMINDER = "PIP Form Closure Date Reminder";

    public static final String PIP_CREATION_EMP_MAIL = "Pip_Creation_Emp";

    public static final String PIP_CREATION_MAIL = "Pip_Creation";

    public static final String PIP_STATUS_UPDATE_EMP_MAIL = "Pip_Status_Update_Emp";

    public static final String PIP_STATUS_UPDATE_MAIL = "Pip_Status_Update";

    public static final String PIP_REVIEWDUEDATE_EMP_MAIL = "Pip_ReviewDueDate_Emp";

    public static final String PIP_REVIEWDUEDATE_MAIL = "Pip_ReviewDueDate";

    public static final String PIP_CLOSUREDUEDATE_EMP_MAIL = "Pip_ClosureDueDate_Emp";

    public static final String PIP_CLOSUREDUEDATE_MAIL = "Pip_ClosureDueDate";

    public static final String PIP_COMMENTS_UPDATE_EMP_MAIL = "Pip_Comments_Update_Emp";

    public static final String PIP_COMMENTS_UPDATE_MAIL = "Pip_Comments_Update";

    public static final String TRAVEL_REQUEST = "Travel Request";

    public static final String TRAVEL_REQUEST_REDIRECT = "#/travel/approval";

    public static final String PRODUCT_NAME_ALREADY_EXITING = "Product Name is already exist!";

    public enum DAY_TYPE {
        WORKING, HOLIDAY, OFF_DAY, ALL;

        @Override
        public String toString() {
            return super.toString();
        }
    }
}

