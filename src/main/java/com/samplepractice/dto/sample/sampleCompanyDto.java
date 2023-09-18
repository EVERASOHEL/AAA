package com.samplepractice.dto.sample;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class sampleCompanyDto {

    private Long id;
    private Date orderDate;
    private String voucherNo;
    private Float totalAmount;
    private Float totalTaxAmount;
    private Float totalTaxableAmount;
    private String gstType;
    private String orderDateString;
    private String Invoice_type;
    private String invoice_no;
    private String invoice_date;
    public String sproduct;
    private Float payAmount;


    public String companyName;
    private String address;
    private String phoneNo;
    private String stateName;
    private Long totalcount;
    private String companyType;
    private String companyGstNo;
    private String companyPanNumber;
    private String companyPhoneNumber;
}
