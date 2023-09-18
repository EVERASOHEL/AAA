package com.samplepractice.dto.paymentdto;

import com.samplepractice.config.CommonConstant;
import com.samplepractice.model.paymentmodels.PaymentModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.util.Date;
import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private Long id;
    private String companyName;
    private Float payAmount;
    private Date paymentDate;
    private String paymentDateString;
    private String paymentMode;
    private Long orderId;

    public PaymentDTO(PaymentModel paymentModel) {
        this.id=paymentModel.getId();
        this.companyName=paymentModel.getCompanyName();
        this.payAmount=paymentModel.getPayAmount();
        this.paymentDateString=CommonConstant.SIMPLE_DATE_FORMAT_DD_MM_YYYY_HH_MM.format(paymentModel.getPaymentDate());
        this.paymentMode=paymentModel.getPaymentMode();
        this.orderId=paymentModel.getOrderId();
    }
}
