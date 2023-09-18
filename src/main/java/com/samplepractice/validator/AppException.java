package com.samplepractice.validator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AppException extends RuntimeException {

   List<?> tList;

   Set<?> tSet;

   public AppException(String message) {
      super(message);
   }

   public AppException(String message, Throwable cause) {
      super(message, cause);
   }

   public AppException(String message, Throwable cause, List<?> tList) {
      super(message, cause);
      this.tList = tList;
   }

   public AppException(String message, Throwable cause, Set<?> tSet) {
      super(message, cause);
      this.tSet = tSet;
   }

   public Object getData() {
      return Objects.isNull(this.tList) ? this.tSet : this.tList;
   }
}
