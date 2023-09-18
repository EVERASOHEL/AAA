package com.samplepractice.model.salesordermodel;

import com.samplepractice.dto.salesorderdto.SalesOrderProductDetailsDTO;
import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "`tbl_salesorderproductdetails`")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("0")
public class SalesOrderProductDetailsModel extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "productname")
    private String productName;

    @Column(name = "producttype")
    private String productType;

    @Column(name = "quantity")
    private Float quantity;

    @Column(name = "price")
    private Float price;

    @Column(name = "total")
    private Float total;

    @Column(name = "salesordercompanyid")
    private Long salesOrderCompanyId;

    public SalesOrderProductDetailsModel(SalesOrderProductDetailsDTO salesOrderProductDetailsDTO) {
        this.id= Objects.nonNull(salesOrderProductDetailsDTO.getId()) ? salesOrderProductDetailsDTO.getId() : null;
        this.productName=salesOrderProductDetailsDTO.getProductName();
        this.price=salesOrderProductDetailsDTO.getPrice();
        this.productType=salesOrderProductDetailsDTO.getProductType();
        this.quantity=salesOrderProductDetailsDTO.getQuantity();
        this.total=salesOrderProductDetailsDTO.getTotal();
        this.salesOrderCompanyId=salesOrderProductDetailsDTO.getSalesOrderCompanyId();
    }

    public SalesOrderProductDetailsModel(String productName, Float quantity) {
        this.productName=productName;
        this.quantity=quantity;
    }
}
