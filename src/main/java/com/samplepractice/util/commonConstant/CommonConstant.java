package com.samplepractice.util.commonConstant;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

public class CommonConstant {
   public static final String APPROVE = "Approve";

   public static final String APPROVED = "Approved";

   public static final String PENDING = "Pending";

   public static final String DONE = "Done";

   public static final String CANCELLED = "Cancelled";

   public static final String STRING_TRUE = "true";

   public static final String STRING_FALSE = "false";

   public static final String IS_IN_OFF_DAY = "IsInOffDay";

   public static final String MATERNITY = "Maternity";

   public static final String PATERNITY = "Paternity";

   public static final String IS_IN_HOLIDAY = "IsInHoliday";

   public static final Boolean TRUE = true;

   public static final Boolean FALSE = false;

   public static final String EMPLOYEE_INFORMATION_EXCEL = "Excel downloaded successfully";

   public static final String LEAVE_CAN_NOT_APPLIED_PRESENT = "LeaveCanNotAppliedPresent";

   public static final String LEAVE_CAN_NOT_APPLIED = "LeaveCanNotApplied";

   public static final String NO_LEAVE_REMAINING = "NoLeaveRemaining";

   public static final String LEAVE_OUT_OF_RANCE = "LeaveOutOfRange";

   public static final String NO_BALANCE_EXIST = "NoBalanceExist";

   public static final String LEAVE_ALREADY_EXIST = "LeaveAlreadyExist";

   public static final String USER_NOT_EXIST = "UserNotExist";

   public static final String SANDWICH = "SandwichApplied";

   public static final String CLUBBING = "ClubbingNotAllowed";

   public static final int REP_1_NUMBER = 1;

   public static final int REP_2_NUMBER = 2;

   public static final int REP_1_AND_2_NUMBER = 3;

   public static final String CHILD_FINAL_APPROVAL = "3A";

   public static final String CHILD_REP_1_APPROVAL = "1A";

   public static final String CHILD_REP_2_APPROVAL = "2A";

   public static final String CHILD_FINAL_REJECT = "3R";

   public static final String CHILD_REP_1_REJECT = "1R";

   public static final String CHILD_REP_2_REJECT = "2R";

   public static final String DD_MMMM_YYYY = "dd-MMMM-yyyy";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MMMM_YYYY = new SimpleDateFormat(DD_MMMM_YYYY);

   public static final String DD_MMMM_YYYY_SPACE = "dd MMMM yyyy";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MMMM_YYYY_SPACE = new SimpleDateFormat(DD_MMMM_YYYY_SPACE);

   //Email Validator
   public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
           Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,16}$", Pattern.CASE_INSENSITIVE);

   public static final Pattern VOTER_ID_REGEX = Pattern.compile("^([a-zA-Z]){3}([0-9]){7}?$", Pattern.CASE_INSENSITIVE);

   public static final Pattern PAN_REGEX = Pattern.compile("[A-Z]{5}[0-9]{4}[A-Z]{1}$", Pattern.CASE_INSENSITIVE);

   public static final Pattern AADHAAR_REGEX = Pattern.compile("^\\d{4}\\d{4}\\d{4}?$", Pattern.CASE_INSENSITIVE);

   public static final Pattern VIRTUAL_AADHAAR_REGEX = Pattern.compile("^\\d{4}\\d{4}\\d{4}\\d{4}?$", Pattern.CASE_INSENSITIVE);

   public static final Pattern PF_REGEX =
           Pattern.compile("^([A-Z]{2}\\/)([A-Z]{3}\\/)([0-9]{7}\\/)([0-9]{3}[\\/]?)?([0-9]{7})$", Pattern.CASE_INSENSITIVE);

   public static final Pattern UAN_NO_REGEX =
           Pattern.compile("^\\d{4}\\d{4}\\d{4}?$", Pattern.CASE_INSENSITIVE);

   public static final Pattern ESIC_REGEX =
           Pattern.compile("^\\d{10}?$", Pattern.CASE_INSENSITIVE);

   public static final Pattern ESIC_REGEX_17_DIGIT =
           Pattern.compile("^\\d{17}?$", Pattern.CASE_INSENSITIVE);

   //Alphabets Only Validator
   public static final Pattern ALPHABET_MATCH = Pattern.compile("^[a-zA-Z ]*$");

   //Account Number Validator
   public static final Pattern ACCOUNT_NO_MATCH = Pattern.compile("^[0-9]{9,18}$");

   //IFSC Code Validator
   public static final Pattern IFSC_CODE_MATCH = Pattern.compile("^[A-Za-z]{4}0[A-Z0-9a-z]{6}$");

   //Branch Code Validator
   public static final Pattern BRANCH_CODE_MATCH = Pattern.compile("^[A-Z0-9a-z]{6}$");

   public static final Pattern FACEBOOK_PROFILE_MATCH = Pattern.compile("http(?:s)?:\\/\\/?(?:www\\.)?(?:facebook|fb|m\\.facebook)\\.(?:com|me)\\/(?:(?:\\w)*#!\\/)?(?:pages\\/)?(?:[\\w\\-]*\\/)*([\\w\\-\\.]+)(?:\\/)?");

   public static final Pattern LINKEDIN_PROFILE_MATCH = Pattern.compile("((https?:\\/\\/)?((www|\\w\\w)\\.)?linkedin\\.com\\/)((([\\w]{2,3})?)|([^\\/]+\\/(([\\w|\\d-&#?=])+\\/?){1,}))$");

   public static final Pattern TWITTER_PROFILE_MATCH = Pattern.compile("http(?:s)?:\\/\\/(?:www\\.)?twitter\\.com\\/([a-zA-Z0-9_]+)");

   //Date patterns
   public static final String DD_MMM_YYYY = "dd-MMM-yyyy";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MMM_YYYY = new SimpleDateFormat(DD_MMM_YYYY);

   public static final String DD_MM_YYYY = "dd-MM-yyyy";

   public static final String YYYY_MM_DD_SLASH = "yyyy/MM/dd";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_SLASH = new SimpleDateFormat(YYYY_MM_DD_SLASH);

   public static final String DD_MM_YYYY_HH_MM_A = "dd-MM-yyyy hh:mm aa";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MM_YYYY_HH_MM_A = new SimpleDateFormat(DD_MM_YYYY_HH_MM_A);

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MM_YYYY = new SimpleDateFormat(DD_MM_YYYY);

   public static final DateTimeFormatter DATE_TIME_FORMATTER_DD_MM_YYYY = DateTimeFormatter.ofPattern(DD_MM_YYYY);

   public static final String DD_MM_YYYY_SLASH = "dd/MM/yyyy";

   public static final String MM_DD_YYYY_SLASH = "MM/dd/yyyy";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MM_YYYY_SLASH = new SimpleDateFormat(DD_MM_YYYY_SLASH);

   public static final String DD_MM_YYYY_HH_MM_SS_SLASH = "dd/MM/yyyy HH:mm:ss";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MM_YYYY_HH_MM = new SimpleDateFormat("dd-MM-yyyy HH:mm");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MM_YYYY_HH_MM_SS = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD_MM_YYYY_HH_MM_SS_SLASH = new SimpleDateFormat(DD_MM_YYYY_HH_MM_SS_SLASH);

   public static final String MM = "MM";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_MM = new SimpleDateFormat(MM);

   public static final String DD = "dd";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_DD = new SimpleDateFormat(DD);

   public static final String MMM_YYYY = "MMM-yyyy";

   public static DateFormat utcDate() {
      DateFormat formatterUTC = new SimpleDateFormat("yyyy-MM-dd");
      formatterUTC.setTimeZone(TimeZone.getTimeZone("UTC"));
      return formatterUTC;
   }

   public static DateFormat utcDateTime() {
      DateFormat formatterUTC = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      formatterUTC.setTimeZone(TimeZone.getTimeZone("UTC"));
      return formatterUTC;
   }

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_MMM_YYYY = new SimpleDateFormat(MMM_YYYY);

   public static final String MMMM = "MMMM";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_MMMM = new SimpleDateFormat(MMMM);

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY = new SimpleDateFormat("yyyy");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_HH_MM = new SimpleDateFormat("HH:mm");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD = new SimpleDateFormat("yyyy-MM-dd");

   public static final DateTimeFormatter DATE_TIME_FORMATTER_YYYY_MM_DD = DateTimeFormatter.ofPattern("yyyy-MM-dd");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_MMM_DD_YYYY = new SimpleDateFormat("MMM-dd-yyyy");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_HH_MM_SS_ZERO = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.0");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_HH_MM_SS = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_HH_MM = new SimpleDateFormat("yyyy-MM-dd HH:mm");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_HH_MM_AA = new SimpleDateFormat("yyyy-MM-dd hh:mm aa");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_HH_MM_A = new SimpleDateFormat("yyyy-MM-dd hh:mm a");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_HH_MM_SS_A = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss a");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_HH_MM_SS_AA = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss aa");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_HH_MM_SS_A = new SimpleDateFormat("hh:mm:ss a");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_HH_MM_SS_AA = new SimpleDateFormat("hh:mm:ss aa");


   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_HH_MM_AA = new SimpleDateFormat("hh:mm aa");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_HH_MM_SS = new SimpleDateFormat("HH:mm:ss");

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_YYYY_MM_DD_T_HH_MM_SS = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

   public static final String MMMM_YYYY = "MMMM-YYYY";

   public static final SimpleDateFormat SIMPLE_DATE_FORMAT_MMMM_YYYY = new SimpleDateFormat(MMMM_YYYY);

   //messages
   public static final String SOMETHING_WENT_WRONG_MSG = "The task you are trying to perform is temporarily unavailable. Kindly contact administrator. ";

   public static final String SUCCESS = "SUCCESS";

   //isAuthenticatedRights Page Operation
   public static final String PAGE_SAVE = "pageSave";

   public static final String PAGE_EDIT = "pageEdit";

   public static final String PAGE_DELETE = "pageDelete";

   public static final String PAGE_VIEW = "pageView";

   //constants for class name
   public static final String ATTENDANCE_CORRECTION_REQUEST_CLASS_NAME = "com.xmplify.hris.tenant.model.AttendanceCorrectionRequest";

   public static final String ATTENDANCE_OUT_STATION_CLASS_NAME = "com.xmplify.hris.tenant.model.AttendanceOutStation";

   public static final String LEAVE_APPLICATION_HEADER_CLASS_NAME = "com.xmplify.hris.tenant.model.LeaveApplicationHeader";

   public static final String EMPLOYEE_EXTRA_WORKING_CLASS_NAME = "com.xmplify.hris.tenant.model.EmployeeExtraWorkingCoffApplication";

   public static final String EXPENSE_CLAIM_MASTER_CLASS_NAME = "com.xmplify.hris.tenant.model.ExpenseClaimMaster";

   public static final String RESIGNATION_CLASS_NAME = "com.xmplify.hris.tenant.model.Resignation";

   public static final String PENDING_CONFIRMATION_CLASS_NAME = "com.xmplify.hris.tenant.model.confirmation.ProbationFormStatus";

   public static final String EXIT_INTERVIEW_CLASS_NAME = "com.xmplify.hris.tenant.model.ExitInterviewTrack";

   public static final String SEP_EXITINTERVIEW_CLASS_NAME = "com.xmplify.hris.tenant.model.SepExitInterview";

   public static final String DEPARTMENT_CLEARANCE_CLASS_NAME = "com.xmplify.hris.tenant.model.ResignationClearance";

   public static final String EMPLOYEE_DOCUMENT_CLASS_NAME = "com.xmplify.hris.tenant.model.editProfile.EmployeeDocument";

   public static final String TICKET_CLASS_NAME = "com.xmplify.hris.tenant.model.ticketManagement.Ticket";

   public static final String TRAVEL_REQUEST_CLASS_NAME = "com.xmplify.hris.tenant.model.TravelRequest.TravelRequestMaster";

   public static final String PIP_CLASS_NAME = "com.xmplify.hris.tenant.model.PipForm.EmployeeWisePipDetails";

   public static final String HOLIDAY = "Holiday";

   public static final String OFFDAY = "Offday";

   public static final String NOT_ALLOWED_TO_PUNCH_IN_OUT = "You are Not allowed to punch IN-OUT";

   public static final String NOT_ALLOWED_TO_PUNCH_IN_FROM_WEB = "You are Not allowed to punch from web";

   public static final String NOT_ALLOWED_TO_PUNCH_IN_FROM_MOBILE = "You are Not allowed to punch from mobile";

   public static final String NOT_ALLOWED_TO_PUNCH_IN_FROM_BIOMETRIC = "You are Not allowed to punch from biometric";

   public static final String OUT_OF_RANGE_PUNCH_IN_OUT = "You are out of punching range";

   public static final String INTERNAL_ERROR = "Internal Error-Contact HR/Admin";

   public static final String SUCCESS_PUNCH_IN_OUT = "Punch-In-Out Successful";

   public static final String SUCCESS_EMPLOYEE_MOVEMENT = "Employee Movement Successful";

   public static final String NOT_ABLE_TO_GET_LOCATION = "Not able to get your current location";

   public static final String PUNCH_IN = "PUNCH IN";

   public static final String PUNCH_OUT = "PUNCH OUT";

   public static final String PUNCH_TRACKER = "TRACKER";

   public static final String MOCK = "MOCK";

   public static final String DEAD = "DEAD";

   public static final String SUCCESS_PUNCH_IN_OUT_BULK = "SUCCESS_PUNCH_IN_OUT_BULK";

   public static final String BULK_PUNCH_IN_OUT = "BULK_PUNCH_IN_OUT";

   public static final String MOBILE = "MOBILE";

   public static final String WEB = "WEB";

   public static final String BIOMETRIC = "BIOMETRIC";

   public static final String IS_MULTI_PUNCH_ALLOWED = "IS_MULTI_PUNCH_ALLOWED";

   public static final String IS_USER_TRACKING_ALLOWED = "IS_USER_TRACKING_ALLOWED";

   public static final String NOT_ALLOWED_TO_MULTI_PUNCH_IN_OUT = "Not allowed to multi punch in.";

   public static final String MULTIPLE_PUNCH_ALLOWED = "MULTIPLE_PUNCH_ALLOWED";

   public static final String TRACKING_ALLOWED = "TRACKING_ALLOWED";

   public static final String TWO_WHEELER = "TWO_WHEELER";

   public static final String FOUR_WHEELER = "FOUR_WHEELER";

   public static final String expenseTracking = "expenseTracking";

   public static final String SYSTEM_WORK_FLOW_TRACKING_INTERVAL = "SYSTEM_WORK_FLOW_TRACKING_INTERVAL";

   public static final String EXPENSE_ALLOWED = "EXPENSE_ALLOWED";

   public static final String GET_PUNCH_FLAGS_SUCCESS = "GET_PUNCH_FLAGS_SUCCESS";

   public static final String GET_PUNCH_FLAGS_FAIL = "GET_PUNCH_FLAGS_FAIL";

   //used for daily attendanceN start don't change this if not required
   public static final String MATENITY_LEAVE = "Matenity Leave";

   public static final String MATERNITY_LEAVE = "Maternity Leave";

   public static final String PATERNITY_LEAVE = "Paternity Leave";

   public static final String OPT_HOLIDAY = "Opt Holiday";

   public static final String NONE = "None";

   public static final String NET = "Net";

   public static final String FIXED = "Fixed";

   public static final String EXCEL = "Excel";

   public static final String PRESENT = "Present";

   public static final String ABSENT = "Absent";

   public static final String LEAVE = "Leave";

   public static final String FIRST = "First";

   public static final String SECOND = "Second";

   public static final String FULL = "Full";

   public static final String ZERO = "0";

   public static final String ZERO_POINT_FIVE = "0.5";

   public static final String ONE = "1";

   public static final String AUTO = "AUTO";

   public static final String MANUAL = "MANUAL";

   //EventCelebration And Thought
   public static final String THOUGHT = "Thought";
   //used for daily attendanceN end don't change this if not required

   public static final String EVENT = "Event";

   public static final Boolean THOUGHTSTATUS = TRUE;

   //Local document url
   public static final String LOCAL_DOCUMENT_URI = "http://122.170.119.98:9092/";

   public static final String LOCAL_DOCUMENT_DOWNLOAD_URI = "http://122.170.119.98:8899/";

   public static final String BASIC_PATH_FOR_DOCUMENT = "Clients/";

   public static final String ACCESS_DENIED = "You don't have access to perform this action";

   public static final String EXTRAWORKING_DATE_AVAILABLE_ERROR_FOR_EXPENSE = "Extra working is already present for date :- ";

   public static final String EXPENSE_DATE_AVAILABLE_ERROR_FOR_EXTRAWORKING = " expense is already present for this date";

   public static final String HTTPS = "https:";

   public static final String HTTP = "http:";

   //TDS CONSTANTS
   public static final String CREATED = "Created";

   public static final String TDS_NEW_TYPE = "New";

   public static final String TDS_OLD_TYPE = "Old";

   public static final String REJECT = "Reject";

   public static final String DRAFT = "Draft";

   public static final String CALCULATE = "Calculate";

   public static final String REJECTED = "Rejected";

   public static int ROLE_ADMIN = 3;

   public static int ROLE_EMPLOYEE = 2;

   public static int ROLE_SUPERADMIN = 1;

   public static final String X_FORWARDED_FOR = "X-Forwarded-For";

   public static final String ID = "id";

   public static final String GREATER_THAN = ">";

   public static final String LESS_THEN = "<";

   public static final String IS_EUQUAL_TO = "==";

   public static final String IS_NOT_EUQUAL_TO = "!=";

   public static final String GREATER_THAN_EUQAL_TO = ">=";

   public static final String LESS_THEN_EQUAL_TO = "<=";

   public static final String EXTENDED = "Extended";

   public static final String CONFIRMED = "Confirmed";

   public static final String TERMINATED = "Terminated";

   public static final String COMPANY_LOGO = "Company Logo/";

   public static final String COMPANY_NAME = "Company Name";

   public static final String FILE_TYPE_DOC = "doc";

   public static final String FILE_TYPE_DOCX = "docx";

   public static final String FILE_TYPE_PDF = "pdf";

   public static final String FILE_TYPE_PNG = "png";

   public static final String FILE_TYPE_JPG = "jpg";

   public static final String FILE_TYPE_JPEG = "jpeg";

   public static final String FILE_TYPE_XLS = "xls";

   public static final String FILE_TYPE_CSV = "csv";

   public static final String FILE_TYPE_XLSX = "xlsx";

   public static final String FILE_TYPE_ZIP = "zip";

   public static final String FILE_TYPE_RAR = "rar";

   public static final String FILE_TYPE_TXT = "txt";

   public static final String FILE_ATTACHMENT_FORMAT_ERROR = "File attachment format MUST be DOC/DOCX/PDF/PNG/JPG/JPEG/XSL/XLSX";

   public static final String FILE_ATTACHMENT_FORMAT_ERROR1 = "File attachment format MUST be PDF/PNG/JPG/JPEG";

   public static final String FILE_ATTACHMENT_FORMAT_ERROR_IMAGE = "File attachment format MUST be PNG/JPG/JPEG";

   public static final String FILE_ATTACHMENT_FORMAT_ERROR2 = "File attachment format MUST be DOC/DOCX/PDF/PNG/JPG/JPEG/XSL/XLSX/TXT/RAR/ZIP";

   //Punch access constants
   public static final int PUNCH_ACCESS_WEB = 1;

   public static final int PUNCH_ACCESS_MOB = 2;

   public static final int PUNCH_ACCESS_WEB_MOB = 3;

   public static final int PUNCH_ACCESS_BIOMETRIC = 4;

   public static final int PUNCH_ACCESS_ALL = 7;

   public static final int PUNCH_IMPORT = 0;

   //mail notification
   public static final String BIRTHDAY = "The birthdays of the below-mentioned employees are falling between ";

   public static final String NEWJOINEE = "Below-mentioned employees joined between ";

   public static final String WORK_ANNIVERSARY = "The work anniversary of the below-mentioned employees is falling between ";

   public static final String CONFIRMATION = "Confirmation of the below-mentioned employees is falling between ";

   public static final String APPRAISAL = "Appraisal of the below-mentioned employees is falling between ";

   public static final String BIRTHDAY1 = "Birthday";

   public static final String NEWJOINEE1 = "New Joinee";

   public static final String WORK_ANNIVERSARY1 = "Work Anniversary";

   public static final String CONFIRMATION1 = "Under Probation";

   public static final String APPRAISAL1 = "Appraisal";

   //version constatnt
   public static final String INVALID_VERSION_ERROR_MAC = "Hi, You are using an older version. For latest version, please press ctrl + F5 for Windows and cmd + F5 for Mac.";

   public static final String INVALID_VERSION_ERROR_ANDROID = "Hi, You are using an older version. Please update EMGAGE to latest version from playstore.";

   public static final String INVALID_VERSION_ERROR_WEB = "Hi, You are using an older version. For latest version, please press ctrl + F5 for Windows and cmd + F5 for Mac.";

   public static final String INVALID_VERSION_ERROR_IPHONE = "Hi, You are using an older version. Please update EMGAGE to latest version from appstore.";

   public static final String TENET_MICA = "mica";

   public static final String TENET_DHRUV_DEV = "dhruvdev";

   public static final String TENET_DHRUV_TESTING = "dhruvtesting";

   public static final String TENET_SARVAGRAM_TESTING = "sarvagramtesting";

   public static final String TENET_SARVAGRAM_DEV = "sarvagramdev";

   public static final String TENET_MANGALAM = "mitpl";

   public static final String EXPENSE_TYPE_CONVEYANCE = "conveyance";

   public static final String EXPENSE_TYPE_MY_CUSTOM_XM_1 = "my custom xm 1";

   public static final String EXPENSE_TYPE_MY_CUSTOM_XM_2 = "my custom xm 2";

   public static final List<String> EXPENSE_EXCEPTIONAL_TENET = Collections.unmodifiableList(Arrays.asList(TENET_MICA, TENET_DHRUV_DEV, TENET_DHRUV_TESTING, TENET_SARVAGRAM_DEV, TENET_SARVAGRAM_TESTING));

   public static final List<String> EXPENSE_EXCEPTIONAL_TYPE = Collections.unmodifiableList(Arrays.asList(EXPENSE_TYPE_CONVEYANCE, EXPENSE_TYPE_MY_CUSTOM_XM_1, EXPENSE_TYPE_MY_CUSTOM_XM_2));

   public static final List<String> LEAVE_EXCEPTIONAL_TENET = Collections.unmodifiableList(Arrays.asList(TENET_MANGALAM, TENET_DHRUV_DEV, TENET_DHRUV_TESTING, TENET_SARVAGRAM_DEV, TENET_SARVAGRAM_TESTING));

   //holiday Details
   public static final String HOLIDAY_DETAILS_SUCCESS = "Holiday detail saved successfully";

   public static final String HOLIDAY_DETAILS_UPDATE_SUCCESS = "Holiday detail updated successfully";

   public static final String HOLIDAY_ALLOCATION_DETAILS_SUCCESS = "Holiday allocation saved successfully";

   public static final String HOLIDAY_ALLOCATION_DETAILS_UPDATE_SUCCESS = "Holiday allocation updated successfully";

   public static final String EXPENSE_VARIATION_TYPE_FIXED = "fixed";

   public static final String EXPENSE_VARIATION_TYPE_CUSTOM = "custom";

   public static final String EXPENSE_VARIATION_TYPE_MULTIPLICATION = "multiplication";

   public static final String EXPENSE_VARIATION_TYPE_ADDITION = "addition";

   public static final String EMPLOYEE_MOVEMENT_REGISTER_PLEASE_CHECK_YOUR_EMAIL_WITHIN_5_MIN = "Kindly check your email to view Employee Movement Register with in 5 minutes.";

   public static final String EMPLOYEE_MOVEMENT_SUMMARY_PLEASE_CHECK_YOUR_EMAIL_WITHIN_5_MIN = "Kindly check your email to view Employee Movement Summary with in 5 minutes.";

   public static final String EMPLOYEE_PF_ESIC_REGISTER_REPORT_PLEASE_CHECK_YOUR_EMAIL_WITHIN_5_MIN = "Kindly check your email to view Employee PF - ESIC Register Report with in 5 minutes.";

   public static final String EMPLOYEE_DETAILED_INFORMATION_REPORT_PLEASE_CHECK_YOUR_EMAIL_WITHIN_5_MIN = "Kindly check your email to view Employee Information Report with in 5 minutes.";

   public static final String PLEASE_SELECT_AT_LEAST_ONE_ITEM = "Please select at least one checkbox.";

   public static final String EMPLOYEE_PF_REPORT_PLEASE_CHECK_YOUR_EMAIL_WITHIN_5_MIN = "Kindly check your email to view Employee PF Report with in 5 minutes.";

   public static final String EMPLOYEE_ESIC_REPORT_PLEASE_CHECK_YOUR_EMAIL_WITHIN_5_MIN = "Kindly check your email to view Employee ESIC Report with in 5 minutes.";

   public static final String INVALID_ID = "Invalid ID.";

   public static final String INVALID_EMPLOYEE_ID = "Invalid Employee ID.";

   public static final String PLEASE_FILL_UP_DESCRIPTION = "Please fill up Job Description.";

   public static final String INVALID_DESIGNATION_NAME = "Invalid Designation Name.";

   public static final String DESIGNATION_GRADE_EXISTS = "Selected designation and grade/cadre already exists";

   public static final String INVALID_GRADE = "Invalid Grade/Cadre.";

   public static final String INVALID_DATE = "Invalid Date.";

   public static final String INVALID_PROMOTION_DATE = "Invalid Promotion Date.";

   public static final String INVALID_PAST_PROMOTION_DATE = "Promotion date can not be past date.";

   public static final String PLEASE_FILL_UP_JOB_NAME = "Please fill up Job Name.";

   public static final String JOB_DESCRIPTION_ALREADY_ASSIDNED = "Job Description is already assigned to selected employee.";

   public static final String JOB_DESCRIPTION_ADDED_SUCCESSFULLY = "Job Description is assigned successfully.";

   public static final String JOB_DESCRIPTION_UPDATED_SUCCESSFULLY = "Job Description/Specification updated successfully.";

   public static final String APPROVAL_CONFIGURATION_UPDATED_SUCCESSFULLY = "Approval Configuration updated successfully";

   public static final String APPROVAL_CONFIGURATION_INSERTED_SUCCESSFULLY = "Approval Configuration inserted successfully";

   public static final String APPROVAL_CONFIGURATION_SBU_ALREADY_EXISTS = "Approval Configuration for selected SBU is already existed";

   public static final String APPROVAL_CONFIGURATION_SBU_DOES_NOT_EXISTS = "Approval Configuration for selected SBU does not exist";

   public static final String SBU_DOES_NOT_EXISTS = "SBU does not exist.";

   public static final String DELETED = "Deleted";

   public static final String PLEASE_SELECT_AT_LEAST_ONE_RECORD = "Please select at least one record.";

   public static final String PENDING_DEPARTMENT_CLEARANCE_FOLDER = "PendingDepartmentClearance/";

   public static final String NOT_CLEAR = "Not Clear";

   public static final String CLEAR = "Clear";

   public static final String DEPARTMENT_CLEARANCE = "Department Clearance";

   public static final String PLEASE_UPDATE_PREVIOUS_STATUS = "Please update previous status.It is Pending.";

   public static final String HR_DOCUMENT_CATEGORY_UPDATED_SUCCESSFULLY = "HR Document Category updated successfully";

   public static final String HR_DOCUMENT_CATEGORY_INSERTED_SUCCESSFULLY = "HR Document Category added successfully";

   public static final String HR_DOCUMENT_CATEGORY_NAME_ALREADY_EXISTED = "HR Document Category Name already available";

   public static final String INVALID_HR_DOCUMENT_CATEGORY_NAME = "Invalid HR Document Category Name";

   public static final String HR_DOCUMENT_CATEGORY_DELETED_SUCCESSFULLY = "HR Document Category deleted successfully";

   public static final String ALREADY_DELETED = "HR Document Category already deleted or not available";

   public static final String HR_DOCUMENT_UPDATED_SUCCESSFULLY = "HR Document updated successfully";

   public static final String HR_DOCUMENT_INSERTED_SUCCESSFULLY = "HR Document added successfully";

   public static final String HR_DOCUMENT_DELETED_SUCCESSFULLY = "HR Document deleted successfully";

   public static final String HR_DOCUMENT_ALREADY_DELETED = "HR Document already deleted or not available";

   public static final String PENDING_PROMOTION_RECORDS_ERROR = "Promotions records are pending for approval. Kindly complete pending approvals to disable approval workflow.";

   public static final String PLEASE_INSERT_HR_DOCUMENT_NAME = "Please enter Document name";

   public static final String HR_DOCUMENT_NAME_ALREADY_EXISTS = "Document name already exists";

   public static final String PLEASE_SELECT_HR_DOCUMENT_CATEGORY_NAME = "Please select Document Category name";

   public static final String SELECTED_HR_DOCUMENT_CATEGORY_DELETED = "Selected document category is deleted";

   public static final String ADDITION = "Addition";

   public static final String CONTRIBUTION = "Contribution";

   public static final String DEDUCTION = "Deduction";

   public static final String SALARY = "Salary";

   public static final String COMPANY_CONTRIBUTIONS = "Company contributions";

   public static final String VP = "VP";

   public static final String VARIABLE_PAY = "Variable pay";

   public static final String GEO_FENCE_IN = "IN";

   public static final String GEO_FENCE_OUT = "OUT";

   public static final String GEO_FENCE_IDLE = "IDLE";

   public static final String GEO_FENCE_ENTER = "ENTER";

   public static final String GEO_FENCE_EXIT = "EXIT";

   public static final String GEO_FENCE_DWELL = "DWELL";

   public static final String GPS_ON = "GPS ON";

   public static final String GPS_OFF = "GPS OFF";

   public static final String GEO_FENCING = "GEO_FENCING";

   public static final String IDLE = "IDLE";

   public static final String GPS = "GPS";

   public static final String SELF = "SELF";

   public static final String MANAGER = "MANAGER";

   public static final String EMPLOYEE = "EMPLOYEE";

   public static final String DEFAULT_TRACKING_NOTIFICATION_TITLE = "Emgage tracking";

   public static final String DEFAULT_TRACKING_NOTIFICATION_DESCRIPTION = "Emgage location tracking enabled";

   public static final String INACCURATE_LOCATION_WEB_ERROR_MSG = "System detected that you are out of punching range. If you are doing this from web browser, try doing it from mobile application to make sure it is not because of inaccurate location captured by your web browser.";

   //for password reset of the employee
   public static final String PASSWORD_RESET_SUCCESSFUL = "Employee Password reset successfully";

   public static final String PASSWORD_RESET_FAILED = "Employee Password reset failed";

   public static final String RESET_MAIL_SUBJECT = "Emgage account password";

   public static long getMiliSecondsOfDayStarting(Date date) {
      try {
         return SIMPLE_DATE_FORMAT_YYYY_MM_DD.parse(SIMPLE_DATE_FORMAT_YYYY_MM_DD.format(date)).getTime();
      } catch (ParseException e) {
         e.printStackTrace();
      }
      return 0;
   }

   public static long getDaysDifferenceOfTwoDates(Date date1, Date date2) {
      long diffInMillies = Math.abs(getMiliSecondsOfDayStarting(date1) - getMiliSecondsOfDayStarting(date2));
      return TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
   }

   public static String EXTRAWORKING = "Extraworking";

   public static String AUTOMATICALLY = "AUTOMATICALLY";

   public static String SYSTEM_GENERATED_EXTRAWORKING = "System generated extraworking";

   public static final String SALARY_SLIP_FORMAT1 = "SalarySlipFormat1";

   public static final String SALARY_SLIP_FORMAT2 = "SalarySlipFormat2";

   public static final String SALARY_SLIP_FORMAT3 = "SalarySlipFormat3";

   public static final String SALARY_SLIP_FORMAT4 = "SalarySlipFormat4";

   public static final String SALARY_SLIP_FORMAT5 = "SalarySlipFormat5";

   public static final String SALARY_SLIP_FORMAT6 = "SalarySlipFormat6";

   public static final String SALARY_SLIP_FORMAT100 = "SalarySlipFormat100";

   public static final String SALARY_SLIP_FORMAT200 = "SalarySlipFormat200";

   public static final String SALARY_SLIP_FORMAT300 = "SalarySlipFormat300";

   public static final String SALARY_SLIP_FORMAT400 = "SalarySlipFormat400";

   public static final String SALARY_SLIP_FORMAT500 = "SalarySlipFormat500";

   public static final String SALARY_SLIP_FORMAT600 = "SalarySlipFormat600";

   public static final String SALARY_SLIP_FORMAT700 = "SalarySlipFormat700";

   public static final String SALARY_SLIP_FORMAT101 = "SalarySlipFormat101";

   public static final String SALARY_SLIP_FORMAT201 = "SalarySlipFormat201";

   public static final String SALARY_SLIP_FORMAT301 = "SalarySlipFormat301";

   public static final String SALARY_SLIP_FORMAT401 = "SalarySlipFormat401";

   public static final String SALARY_SLIP_FORMAT501 = "SalarySlipFormat501";

   public static final String SALARY_SLIP_FORMAT601 = "SalarySlipFormat601";

   public static final String SALARY_SLIP_FORMAT701 = "SalarySlipFormat701";

   public static final String SALARY_SLIP_FORMAT102 = "SalarySlipFormat102";

   public static final String SALARY_SLIP_FORMAT202 = "SalarySlipFormat202";

   public static final String SALARY_SLIP_FORMAT302 = "SalarySlipFormat302";

   public static final String SALARY_SLIP_FORMAT402 = "SalarySlipFormat402";

   public static final String SALARY_SLIP_FORMAT502 = "SalarySlipFormat502";

   public static final String SALARY_SLIP_FORMAT602 = "SalarySlipFormat602";

   public static final String SALARY_SLIP_FORMAT702 = "SalarySlipFormat702";

   public static final String SALARY_SLIP_FORMAT411 = "SalarySlipFormat411";

   public static final String SALARY_SLIP_FORMAT412 = "SalarySlipFormat412";

   public static final String SALARY_SLIP_FORMAT410 = "SalarySlipFormat410";

   public static final Long ONE_DAY_MILISECONDS = 86400000L;

   public static final Long ONE_MINUTE_MILISECONDS = 60000L;

   public static final Long ONE_SECOND_MILISECONDS = 1000L;

   public static final String ERROR_LIST = "errorList";

   public static final String MESSAGE = "message";

   public static final String RESPONSEOBJECT = "responseObject";

   public static final String CHILD = "Child";

   public static final String ALL = "All";

   public static final String GOOGLE_STORE_IMAGE = "essimages/googleStore.png";
   public static final String APPLE_STORE_IMAGE = "essimages/appleStore.png";
   public static final String PORTAL_IMAGE = "essimages/portal.png";
   public static final String FACEBOOK_IMAGE = "essimages/facebook.png";
   public static final String INSTAGRAM_IMAGE = "essimages/instagram.png";
   public static final String LINKEDIN_IMAGE = "essimages/linkedin.png";
   public static final String TWITTER_IMAGE = "essimages/twitter.png";

   public static final String F_AND_F_PAID = "F&F Paid";

   public static final List<String> REGULARIZATION_LIMIT_APPLICABLE_TYPES = new ArrayList<String>(Arrays.asList("Early Going Request", "Late Coming Request", "Time Off"));

   public static final String IMPORT = "IMPORT";

   public static String getHoursHHMMfromMinutes(Integer minutes) {
      return String.format("%2s", String.valueOf(minutes / 60)).replace(" ", "0") + ":" + String.format("%2s", String.valueOf(minutes % 60)).replace(" ", "0");
   }

   public static final String ATTENDANCE_HELTH_REPORT_MAIL_TEMPLATE = "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:th=\"http://www.thymeleaf.org\">\n" +
           "   <head>\n" +
           "      <title> </title>\n" +
           "      <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
           "      <meta name=\"viewport\" content=\"width=320, target-densitydpi=device-dpi\">\n" +
           "      <style type=\"text/css\"> \n" +
           "         .im { \n" +
           "         color: #000000 !important; \n" +
           "         } \n" +
           "         /* Add 100px so mobile switch bar doesnt cover street address. */ \n" +
           "         body { \n" +
           "         background-color: #ececec; \n" +
           "         margin: 0; \n" +
           "         padding: 0; \n" +
           "         } \n" +
           "         img { \n" +
           "         outline: none; \n" +
           "         text-decoration: none; \n" +
           "         display: block; \n" +
           "         } \n" +
           "         br, \n" +
           "         strong br, \n" +
           "         b br, \n" +
           "         em br, \n" +
           "         i br { \n" +
           "         line-height: 100%; \n" +
           "         } \n" +
           "         h1, \n" +
           "         h2, \n" +
           "         h3, \n" +
           "         h4, \n" +
           "         h5, \n" +
           "         h6 { \n" +
           "         line-height: 100% !important; \n" +
           "         -webkit-font-smoothing: antialiased; \n" +
           "         } \n" +
           "         h1 a, \n" +
           "         h2 a, \n" +
           "         h3 a, \n" +
           "         h4 a, \n" +
           "         h5 a, \n" +
           "         h6 a { \n" +
           "         color: blue !important; \n" +
           "         } \n" +
           "         h1 a:active, \n" +
           "         h2 a:active, \n" +
           "         h3 a:active, \n" +
           "         h4 a:active, \n" +
           "         h5 a:active, \n" +
           "         h6 a:active { \n" +
           "         color: red !important; \n" +
           "         } \n" +
           "         /* Fonts and Content */ \n" +
           "         body, \n" +
           "         td { \n" +
           "         font-family: HelveticaNeue, sans-serif; \n" +
           "         } \n" +
           "         .header-content, \n" +
           "         .footer-content-left, \n" +
           "         .footer-content-right { \n" +
           "         -webkit-text-size-adjust: none; \n" +
           "         -ms-text-size-adjust: none; \n" +
           "         } \n" +
           "         /* Prevent Webkit and Windows Mobile platforms from changing default font sizes on header and footer. */ \n" +
           "         .header-content { \n" +
           "         font-size: 12px; \n" +
           "         color: #ffffff; \n" +
           "         } \n" +
           "         .header-content a { \n" +
           "         font-weight: bold; \n" +
           "         color: #fafafa; \n" +
           "         text-decoration: none; \n" +
           "         } \n" +
           "         #headline p { \n" +
           "         color: #FFFFFF; \n" +
           "         font-family: HelveticaNeue, sans-serif; \n" +
           "         font-size: 24px; \n" +
           "         text-align: center; \n" +
           "         margin-top: 0px; \n" +
           "         margin-bottom: 30px; \n" +
           "         } \n" +
           "         #headline p a { \n" +
           "         color: #FFFFFF; \n" +
           "         text-decoration: none; \n" +
           "         } \n" +
           "         .article-title { \n" +
           "         font-size: 18px; \n" +
           "         line-height: 24px; \n" +
           "         color: #074a5c; \n" +
           "         font-weight: bold; \n" +
           "         margin-top: 0px; \n" +
           "         margin-bottom: 18px; \n" +
           "         font-family: HelveticaNeue, sans-serif; \n" +
           "         } \n" +
           "         .article-title a { \n" +
           "         color: #074a5c; \n" +
           "         text-decoration: none; \n" +
           "         } \n" +
           "         .article-title.with-meta { \n" +
           "         margin-bottom: 0; \n" +
           "         } \n" +
           "         .article-meta { \n" +
           "         font-size: 13px; \n" +
           "         line-height: 20px; \n" +
           "         color: #ccc; \n" +
           "         font-weight: bold; \n" +
           "         margin-top: 0; \n" +
           "         } \n" +
           "         .article-content { \n" +
           "         font-size: 13px; \n" +
           "         line-height: 18px; \n" +
           "         color: #444444; \n" +
           "         margin-top: 0px; \n" +
           "         margin-bottom: 18px; \n" +
           "         font-family: HelveticaNeue, sans-serif; \n" +
           "         } \n" +
           "         .article-content a { \n" +
           "         color: #00707b; \n" +
           "         font-weight: bold; \n" +
           "         text-decoration: none; \n" +
           "         } \n" +
           "         .article-content img { \n" +
           "         max-width: 100% \n" +
           "         } \n" +
           "         .article-content ol, \n" +
           "         .article-content ul { \n" +
           "         margin-top: 0px; \n" +
           "         margin-bottom: 18px; \n" +
           "         margin-left: 19px; \n" +
           "         padding: 0; \n" +
           "         } \n" +
           "         .article-content li { \n" +
           "         font-size: 13px; \n" +
           "         line-height: 18px; \n" +
           "         color: #444444; \n" +
           "         } \n" +
           "         .article-content li a { \n" +
           "         color: #00707b; \n" +
           "         text-decoration: underline; \n" +
           "         } \n" +
           "         .article-content p { \n" +
           "         margin-bottom: 15px; \n" +
           "         } \n" +
           "         .footer-content-left { \n" +
           "         font-size: 12px; \n" +
           "         line-height: 15px; \n" +
           "         color: #e2e2e2; \n" +
           "         margin-top: 0px; \n" +
           "         margin-bottom: 15px; \n" +
           "         } \n" +
           "         .footer-content-left a { \n" +
           "         color: #f7f7f7; \n" +
           "         font-weight: bold; \n" +
           "         text-decoration: none; \n" +
           "         } \n" +
           "         .footer-content-right { \n" +
           "         font-size: 11px; \n" +
           "         line-height: 16px; \n" +
           "         color: #e2e2e2; \n" +
           "         margin-top: 0px; \n" +
           "         margin-bottom: 15px; \n" +
           "         } \n" +
           "         .footer-content-right a { \n" +
           "         color: #f7f7f7; \n" +
           "         font-weight: bold; \n" +
           "         text-decoration: none; \n" +
           "         } \n" +
           "         #footer { \n" +
           "         background-color: #26a69a; \n" +
           "         color: #e2e2e2; \n" +
           "         } \n" +
           "         #footer a { \n" +
           "         color: #f7f7f7; \n" +
           "         text-decoration: none; \n" +
           "         font-weight: bold; \n" +
           "         } \n" +
           "         #permission-reminder { \n" +
           "         white-space: normal; \n" +
           "         } \n" +
           "         #street-address { \n" +
           "         color: #fcfcfc; \n" +
           "         white-space: normal; \n" +
           "         } \n" +
           "         .salary-computation-table { \n" +
           "         width: 100%; \n" +
           "         text-align: left; \n" +
           "         border: 1px solid; \n" +
           "         border-collapse: collapse; \n" +
           "         font-family: calibri; \n" +
           "         } \n" +
           "      </style>\n" +
           "   </head>\n" +
           "   <body>\n" +
           "      <table id=\"background-table\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">\n" +
           "         <tbody>\n" +
           "            <tr>\n" +
           "               <td align=\"center\" bgcolor=\"#ececec\">\n" +
           "                  <table class=\"w640\" style=\"margin:0 10px;\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">\n" +
           "                     <tbody>\n" +
           "                        <tr>\n" +
           "                           <td class=\"w640\" height=\"20\" width=\"100%\" /> \n" +
           "                        </tr>\n" +
           "                        <tr>\n" +
           "                           <td id=\"header\" class=\"w640\" align=\"center\" bgcolor=\"#5788C2\" width=\"100%\">\n" +
           "                              <table class=\"w640\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">\n" +
           "                                 <tbody>\n" +
           "                                    <tr>\n" +
           "                                       <td class=\"w30\" width=\"30\" /> \n" +
           "                                       <td class=\"w580\" height=\"30\" width=\"95%\" /> \n" +
           "                                       <td class=\"w30\" width=\"30\" /> \n" +
           "                                    </tr>\n" +
           "                                    <tr>\n" +
           "                                       <td class=\"w30\" width=\"30\" /> \n" +
           "                                       <td class=\"w580\" width=\"95%\">\n" +
           "                                          <div id=\"headline\" align=\"center\">\n" +
           "                                             <p>\n" +
           "                                                <strong>\n" +
           "                                                   <singleline label=\"Title\" \n" +
           "                                                      th:text=\"Emgage\" />\n" +
           "                                                </strong>\n" +
           "                                             </p>\n" +
           "                                          </div>\n" +
           "                                       </td>\n" +
           "                                       <td class=\"w30\" width=\"30\" /> \n" +
           "                                    </tr>\n" +
           "                                 </tbody>\n" +
           "                              </table>\n" +
           "                           </td>\n" +
           "                        </tr>\n" +
           "                        <tr>\n" +
           "                           <td class=\"w640\" bgcolor=\"#ffffff\" height=\"30\" width=\"100%\" /> \n" +
           "                        </tr>\n" +
           "                        <tr id=\"simple-content-row\">\n" +
           "                           <td class=\"w640\" bgcolor=\"#ffffff\" width=\"100%\">\n" +
           "                              <table class=\"w640\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" border=\"0\" \n" +
           "                                 width=\"100%\">\n" +
           "                                 <tbody>\n" +
           "                                    <tr>\n" +
           "                                       <td class=\"w30\" width=\"30\" /> \n" +
           "                                       <td class=\"w580\" width=\"95%\">\n" +
           "                                          <repeater>\n" +
           "                                             <layout label=\"Text only\">\n" +
           "                                                <table class=\"w580\" cellpadding=\"0\" cellspacing=\"0\" \n" +
           "                                                   border=\"0\" width=\"95%\">\n" +
           "                                                   <tbody>\n" +
           "                                                      <tr>\n" +
           "                                                         <td class=\"w580\" width=\"95%\">\n" +
           "                                                            <div class=\"article-content\" align=\"left\">\n" +
           "                                                               <multiline label=\"Description\">\n" +
           "                                                                  <b>\n" +
           "                                                                     <h3> \n" +
           "                                                                        Attendance Scheduler Health \n" +
           "                                                                        Report \n" +
           "                                                                     </h3>\n" +
           "                                                                  </b>\n" +
           "                                                               </multiline>\n" +
           "                                                               <br /> \n" +
           "                                                               <font color=\"black\">\n" +
           "                                                                  <multiline label=\"Description\"> \n" +
           "                                                                     Hello, \n" +
           "                                                                  </multiline>\n" +
           "                                                               </font>\n" +
           "                                                               <br /> \n" +
           "                                                               <font color=\"black\"> \n" +
           "                                                               Please find below details of \n" +
           "                                                               attendance scheduler health report. \n" +
           "                                                               </font> \n" +
           "                                                               <br /> \n" +
           "                                                               <br /> \n" +
           "                                                               <table class=\"salary-computation-table\">\n" +
           "                                                                  <tr>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\">Sr \n" +
           "                                                                           No.</font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Customer Name \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Start Time</font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           End Time</font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Date \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Total Employee \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Processed Employee \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Shift Not Assign Employee\n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           In Punch Employee\n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Out Punch Employee\n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Non Working Employee\n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Force Update Employee\n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Relieving Date Employee\n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Freeze Employee\n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Error Count \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           Error Details \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                  </tr>\n" +
           "                                                                  <tr th:each=\"schedularHealthReportDTO,iter : ${bodyMsgData.emailBody.propertiesDTO}\">\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\"\n" +
           "                                                                        >\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:text=\"${iter.index + 1}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\"\n" +
           "                                                                        >\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:text=\"${schedularHealthReportDTO.tenantId}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\" \n" +
           "                                                                        class=\"table-td-border\"\n" +
           "                                                                        >\n" +
           "                                                                        <div class=\"article-content\" \n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:text=\"${#dates.format(schedularHealthReportDTO.startTime, 'dd-MM-yyyy HH:mm:ss')}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\"\n" +
           "                                                                        >\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:text=\"${#dates.format(schedularHealthReportDTO.endTime, 'dd-MM-yyyy HH:mm:ss')}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\"\n" +
           "                                                                        >\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.processDate}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.totalEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.processEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.shiftNotAssignEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.inPunchEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.outPunchEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.nonWorkingEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.forceUpdateEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.relievingDateEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.freezeEmployee}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.errorCount}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                     <td style=\"border: 1px solid\"\n" +
           "                                                                        class=\"table-td-border\">\n" +
           "                                                                        <div class=\"article-content\"\n" +
           "                                                                           align=\"left\"> \n" +
           "                                                                           <font color=\"black\"> \n" +
           "                                                                           <span \n" +
           "                                                                              th:utext=\"${schedularHealthReportDTO.errorDetails}\" /> \n" +
           "                                                                           </font> \n" +
           "                                                                        </div>\n" +
           "                                                                     </td>\n" +
           "                                                                  </tr>\n" +
           "                                                               </table>\n" +
           "                                                               <br /> -- <br /> \n" +
           "                                                               <font color=\"black\">Note:</font><br /><font color=\"black\">If only tenant name is came then schedulerMasterService.tenantHasAccessToRunScheduler is false.</font> \n" +
           "                                                               <br /><font color=\"black\">If processed and error details not found then systemWorkFlow.getAttendenceSchedulerAllow is false.</font><br /> \n" +
           "                                                               <br /> \n" +
           "                                                               <font color=\"black\">Thanks & Regards, \n" +
           "                                                               </font> \n" +
           "                                                               <br /> \n" +
           "                                                               <font color=\"black\">Administrator01 \n" +
           "                                                               </font> \n" +
           "                                                               <br /> \n" +
           "                                                               <font color=\"black\"> \n" +
           "                                                               <span \n" +
           "                                                                  th:text=\"Emgage\" /> \n" +
           "                                                               </font> \n" +
           "                                                            </div>\n" +
           "                                                         </td>\n" +
           "                                                      </tr>\n" +
           "                                                      <tr>\n" +
           "                                                         <td class=\"w580\" height=\"10\" width=\"95%\" /> \n" +
           "                                                      </tr>\n" +
           "                                                   </tbody>\n" +
           "                                                </table>\n" +
           "                                             </layout>\n" +
           "                                          </repeater>\n" +
           "                                       </td>\n" +
           "                                       <td class=\"w30\" width=\"30\" /> \n" +
           "                                    </tr>\n" +
           "                                 </tbody>\n" +
           "                              </table>\n" +
           "                           </td>\n" +
           "                        </tr>\n" +
           "                        <tr>\n" +
           "                           <td class=\"w640\" bgcolor=\"#ffffff\" height=\"15\" width=\"100%\" /> \n" +
           "                        </tr>\n" +
           "                        <tr>\n" +
           "                           <td class=\"w640\" width=\"100%\">\n" +
           "                              <table id=\"footer\" class=\"w640\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#26a69a\" \n" +
           "                                 border=\"0\" width=\"100%\">\n" +
           "                                 <tbody>\n" +
           "                                    <tr>\n" +
           "                                       <td class=\"w30\" width=\"30\" /> \n" +
           "                                       <td class=\"w580\" valign=\"top\" width=\"360\">\n" +
           "                                          <span class=\"hide\">\n" +
           "                                             <p id=\"permission-reminder\" class=\"footer-content-left\" \n" +
           "                                                align=\"left\" /> \n" +
           "                                          </span>\n" +
           "                                       </td>\n" +
           "                                       <td class=\"hide w0\" width=\"60\" /> \n" +
           "                                       <td class=\"hide w0\" valign=\"top\" width=\"260\">\n" +
           "                                          <p id=\"street-address\" class=\"footer-content-right\" align=\"right\">\n" +
           "                                             Powered by : \n" +
           "                                             <a \n" +
           "                                                href=\"https://emgage.work/\">\n" +
           "                                                <webversion> \n" +
           "                                                   <span \n" +
           "                                                      th:text=\"Emgage\"> \n" +
           "                                                </webversion>\n" +
           "                                                </span> \n" +
           "                                             </a>\n" +
           "                                          </p>\n" +
           "                                       </td>\n" +
           "                                       <td class=\"w30\" width=\"30\" /> \n" +
           "                                    </tr>\n" +
           "                                 </tbody>\n" +
           "                              </table>\n" +
           "                           </td>\n" +
           "                        </tr>\n" +
           "                        <tr>\n" +
           "                           <td class=\"w640\" height=\"60\" width=\"100%\" /> \n" +
           "                        </tr>\n" +
           "                     </tbody>\n" +
           "                  </table>\n" +
           "               </td>\n" +
           "            </tr>\n" +
           "         </tbody>\n" +
           "      </table>\n" +
           "   </body>\n" +
           "</html>";
}
