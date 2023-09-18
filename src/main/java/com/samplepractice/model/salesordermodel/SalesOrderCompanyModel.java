package com.samplepractice.model.salesordermodel;

import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;
import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "`tbl_salesordercompany`")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("0")
public class SalesOrderCompanyModel extends AbstractAuditingEntity {

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

    @Transient
    private String invoice_type;

    @Transient
    private String invoice_no;

    @Transient
    private String invoice_date;

    @Transient
    private String sales_product;

    @Transient
    private String name;
    @Transient
    private String address;

    @Transient
    private List<SalesOrderCompanyModel> sales_product_list;

    public SalesOrderCompanyModel(SalesOrderCompanyDTO salesOrderCompanyDTO) {
        this.id = Objects.nonNull(salesOrderCompanyDTO.getId()) ? salesOrderCompanyDTO.getId() : null;
        this.orderDate = salesOrderCompanyDTO.getOrderDate();
        this.voucherNo = salesOrderCompanyDTO.getVoucherNo();
        this.companyName = salesOrderCompanyDTO.getCompanyName();
        this.totalAmount = salesOrderCompanyDTO.getTotalAmount();
        this.totalTaxAmount = salesOrderCompanyDTO.getTotalTaxAmount();
        this.totalTaxableAmount = salesOrderCompanyDTO.getTotalTaxableAmount();
        this.gstType = salesOrderCompanyDTO.getGstType();
    }

    public SalesOrderCompanyModel(String s, String s1) {
        this.name=s;
        this.address=s1;
    }
}
