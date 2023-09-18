package com.samplepractice.model.salesordermodel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SalesOrderCompanyModelCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "orderdate")
    private Date orderDate;

    @Column(name = "voucherno")
    private String voucherNo;

    @Column(name = "companyname")
    private String companyName;

    @Column(name = "totalamount")
    private Float totalAmount;

    @Column(name = "totaltaxamount")
    private Float totalTaxAmount;

    @Column(name = "totaltaxableamount")
    private Float totalTaxableAmount;

    @Column(name = "gsttype")
    private String gstType;

    @Column(name = "listCount")
    private Long totalcount;
}
