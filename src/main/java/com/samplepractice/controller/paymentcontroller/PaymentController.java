package com.samplepractice.controller.paymentcontroller;

import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.dto.paymentdto.PaymentDTO;
import com.samplepractice.repository.paymentRepository.PaymentRepository;
import com.samplepractice.services.paymentservice.PaymentService;
import com.samplepractice.util.Impl.CommonResponse;
import com.samplepractice.validator.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paymentController")
public class PaymentController {

    private String moduleName="Payment";

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/savevendorpayment")
    public ResponseEntity<?> saveorupdatecompany(@RequestBody PaymentDTO paymentDTO){
        try {
            return CommonResponse.getData(paymentService.saveVendorPaymentAmount(paymentDTO));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getpaymentHistory/{orderId}")
    public ResponseEntity<?> getPaymentHistory(@PathVariable Long orderId) {
        try {
            return CommonResponse.getData(paymentService.getHistoryofpaymentbyorderId(orderId));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getTotalPayableAmountAndReceivableAmount")
    public ResponseEntity<?> getTotalAmountPaybleAndReceivable() {
        try {
            return CommonResponse.getData(paymentService.gettotalPaymentCalculation());
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

}
