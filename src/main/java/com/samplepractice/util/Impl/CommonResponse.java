package com.samplepractice.util.Impl;

import com.samplepractice.config.Constants;
import com.samplepractice.util.apiResponse.ApiResponse;
import com.samplepractice.util.commonConstant.CommonConstant;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CommonResponse {

//   private static CommonService commonService;
//
//   public void init(CommonService commonService) {
//      com.xmplify.hris.util.CommonResponse.commonService = commonService;
//   }

   /*
    * common success and fail status
    * */
   public static <T> ResponseEntity<?> success(T responseList) {
      return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.value(), Constants.TRUE, Constants.STATUS_SUCCESS, responseList));
   }

   public static <T> ResponseEntity<?> success(T responseList, String message) {
      return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.value(), Constants.TRUE, message, responseList));
   }

   public static <T> ResponseEntity<?> successWithCustomMessage(String message, T responseList) {
      return ResponseEntity.ok(new ApiResponse(HttpStatus.OK.value(), Constants.TRUE, message, responseList));
   }

   public static <T> ResponseEntity<?> noContent(T responseList) {
      return new ResponseEntity(
              new ApiResponse(HttpStatus.NO_CONTENT.value(), Constants.FALSE, Constants.STATUS_FAILURE, responseList),
              HttpStatus.NO_CONTENT);
   }

   public static <T> ResponseEntity<?> noContent(T responseList, String message) {
      return new ResponseEntity(
              new ApiResponse(HttpStatus.NO_CONTENT.value(), Constants.FALSE, message, responseList),
              HttpStatus.NO_CONTENT);
   }

   public static <T> ResponseEntity<?> somethingWentWrong(String moduleName, Exception e) {
//      CommonResponse commonResponse = new CommonResponse();
//      commonService.sendMailForSomethingWendWrong(moduleName, e);
      return new ResponseEntity(
              new ApiResponse(HttpStatus.BAD_REQUEST.value(), Constants.FALSE, CommonConstant.SOMETHING_WENT_WRONG_MSG, CommonConstant.SOMETHING_WENT_WRONG_MSG),
              HttpStatus.BAD_REQUEST);
   }

   public static <T> ResponseEntity<?> badRequestWithCustomMessage(T responseList, String message) {
      return new ResponseEntity(
              new ApiResponse(HttpStatus.BAD_REQUEST.value(), Constants.FALSE, message, responseList),
              HttpStatus.BAD_REQUEST);
   }

   public static <T> ResponseEntity<?> exceptionWithBadRequest(T responseList, String message) {
      return new ResponseEntity(new ApiResponse(HttpStatus.BAD_REQUEST.value(), Constants.FALSE, message, responseList), HttpStatus.OK);
   }

   public static <T> ResponseEntity<?> getData(Page<T> responseList) {
      if (Objects.nonNull(responseList) && responseList.getContent().size() > 0) {
         return success(responseList);
      } else {
         return noContent(responseList);
      }
   }

   public static <T> ResponseEntity<?> getData(Page<T> responseList, String message) {
      if (Objects.nonNull(responseList) && responseList.getContent().size() > 0) {
         return success(responseList, message);
      } else {
         return noContent(responseList, message);
      }
   }

   public static <T> ResponseEntity<?> getData(List<T> responseList) {
      if (Objects.nonNull(responseList) && responseList.size() > 0) {
         return success(responseList);
      } else {
         return noContent(responseList);
      }
   }

   public static <T> ResponseEntity<?> getData(List<T> responseList, String message) {
      if (Objects.nonNull(responseList) && responseList.size() > 0) {
         return success(responseList, message);
      } else {
         return noContent(responseList, message);
      }
   }

   public static <T> ResponseEntity<?> getData(T response) {
      if (Objects.nonNull(response)) {
         return success(response);
      } else {
         return noContent(response);
      }
   }

   public static <T> ResponseEntity<?> getData(T response, String message) {
      if (Objects.nonNull(response)) {
         return success(response, message);
      } else {
         return noContent(response, message);
      }
   }

   public static <T> ResponseEntity<?> exception(String message) {
      return new ResponseEntity(
              new ApiResponse(HttpStatus.NO_CONTENT.value(), Constants.FALSE, message, message),
              HttpStatus.OK);
   }

   public static <T> ResponseEntity<?> errorWithMessage(String message) {
      return new ResponseEntity<>(new ApiResponse(HttpStatus.NO_CONTENT.value(), Constants.FALSE, message, message), HttpStatus.BAD_REQUEST);
   }

   // new return for data list or no data msg
   public static <T> ResponseEntity<?> getDataOrNoDataMsg(List<T> responseList, String successMessage, String noDataMsg) {
      if (Objects.nonNull(responseList) && responseList.size() > 0) {
         return success(responseList, successMessage);
      } else {
         return noContentWithMsg(noDataMsg);
      }
   }

   public static <T> ResponseEntity<?> getDataOrNoDataMsg(Page<T> responseList, String successMessage, String noDataMsg) {
      if (Objects.nonNull(responseList) && responseList.getContent().size() > 0) {
         return success(responseList, successMessage);
      } else {
         return noContentWithMsg(noDataMsg);
      }
   }

   public static <T> ResponseEntity<?> getDataOrNoDataMsg(T responseList, String successMessage, String noDataMsg) {
      if (Objects.nonNull(responseList)) {
         return success(responseList, successMessage);
      } else {
         return noContentWithMsg(noDataMsg);
      }
   }

   public static <T> ResponseEntity<?> noContentWithMsg(String msg) {
      return new ResponseEntity(
              new ApiResponse(HttpStatus.NO_CONTENT.value(), Constants.FALSE, msg, null),
              HttpStatus.OK);
   }

   public static <T> ResponseEntity<?> exceptionWithOnlyMsg(String msg) {
      return new ResponseEntity(
              new ApiResponse(HttpStatus.NO_CONTENT.value(), Constants.FALSE, msg, null),
              HttpStatus.OK);
   }
}
