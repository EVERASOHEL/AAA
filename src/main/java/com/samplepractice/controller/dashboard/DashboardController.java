package com.samplepractice.controller.dashboard;

import com.samplepractice.util.Impl.CommonResponse;
import com.samplepractice.validator.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

public class DashboardController {

//    @GetMapping("/getTotalPayableAmountAndReceivableAmount")
//    public ResponseEntity<?> getTotalAmountPaybleAndReceivable() {
//        try {
//            return CommonResponse.getData(paymentService.gettotalPaymentCalculation());
//        }catch (AppException ae) {
//            return CommonResponse.exception(ae.getMessage());
//        } catch (Exception e) {
//            return CommonResponse.somethingWentWrong(moduleName, e);
//        }
//    }
}
