package com.samplepractice.dto.paymentdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentReceivablesOrPayables {

    private String companyName;
    private Float totalAmount;
    private Float totalReceivableOrPayable;

    public PaymentReceivablesOrPayables(Object[] list) {
        this.totalAmount= Objects.nonNull(list[0]) ? Float.parseFloat(list[0].toString()) : 0.00f;
        this.totalReceivableOrPayable= Objects.nonNull(list[1]) ? Float.parseFloat(list[1].toString()) : 0.00f;
    }

    public PaymentReceivablesOrPayables(String companyName, double totalAmount, double totalReceivableOrPayable) {
        this.companyName=companyName;
        this.totalAmount=(float)totalAmount;
        this.totalReceivableOrPayable=(float)totalReceivableOrPayable;
    }
}
