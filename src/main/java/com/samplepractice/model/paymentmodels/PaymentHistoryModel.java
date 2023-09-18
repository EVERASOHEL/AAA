package com.samplepractice.model.paymentmodels;

import com.samplepractice.dto.paymentdto.PaymentDTO;
import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "`tbl_vendor_payment_history`")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("0")
public class PaymentHistoryModel extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`companyname`")
    private String companyName;

    @Column(name = "payamount")
    private Float payAmount;

    @Column(name = "paymentdate")
    private Date paymentDate;

    @Column(name = "`paymentmode`")
    private String paymentMode;

    @Column(name = "`orderid`")
    private Long orderId;

    @Column(name = "`paymentid`")
    private Long paymentId;

    public PaymentHistoryModel(PaymentDTO paymentDTO, Long paymentId) {
        this.id = Objects.nonNull(paymentDTO.getId()) ? paymentDTO.getId() : null;
        this.companyName = paymentDTO.getCompanyName();
        this.payAmount = paymentDTO.getPayAmount();
        this.paymentDate = paymentDTO.getPaymentDate();
        this.paymentMode = Objects.nonNull(paymentDTO.getPaymentMode()) ? paymentDTO.getPaymentMode() : null;
        this.orderId = paymentDTO.getOrderId();
        this.paymentId = paymentId;
    }
}
