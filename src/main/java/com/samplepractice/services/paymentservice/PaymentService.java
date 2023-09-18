package com.samplepractice.services.paymentservice;

import com.samplepractice.dto.paymentdto.PaymentDTO;
import com.samplepractice.dto.paymentdto.PaymentReceivablesOrPayables;
import com.samplepractice.model.paymentmodels.PaymentModel;

import java.util.List;

public interface PaymentService {

    String saveVendorPaymentAmount(PaymentDTO paymentDTO) throws Exception;

    List<PaymentDTO> getHistoryofpaymentbyorderId(Long orderId);

    List<PaymentReceivablesOrPayables> gettotalPaymentCalculation();

}
