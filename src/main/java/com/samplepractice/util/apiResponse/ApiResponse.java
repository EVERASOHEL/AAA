package com.samplepractice.util.apiResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Getter
@Setter
@AllArgsConstructor
public class ApiResponse {
   private int code;

   private Boolean success;

   private String message;

   private Object responseObj;

   private Long count;

   public ApiResponse(int code, Boolean success, String message, Object responseObj) {
      this.code = code;
      this.success = success;
      this.message = message;
      if (responseObj instanceof Page) {
         this.responseObj = ((Page) responseObj).getContent();
         this.count = ((Page) responseObj).getTotalElements();
      }else {
         this.responseObj = responseObj;
      }
   }
}
