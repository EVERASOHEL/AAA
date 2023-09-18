package com.samplepractice.dto.salesorderdto;

import com.samplepractice.dto.sample.sampleCompanyDto;
import com.samplepractice.model.salesordermodel.SalesOrderProductDetailsModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SalesOrderProductDetailsDTO {

    private Long id;
    private String productName;
    private String productType;
    private Float quantity;
    private Float price;
    private Float total;
    private Long salesOrderCompanyId;
    private String hsnCode;

    public SalesOrderProductDetailsDTO(SalesOrderProductDetailsDTO list, Long id) {
        this.id= Objects.nonNull(list.getId()) ? list.getId() : null;
        this.productName=list.getProductName();
        this.productType=list.getProductType();
        this.quantity=list.getQuantity();
        this.price=list.getPrice();
        this.total=list.getTotal();
        this.salesOrderCompanyId=id;
    }

    public SalesOrderProductDetailsDTO(SalesOrderProductDetailsModel salesOrderProductDetailsModel) {
        this.id=salesOrderProductDetailsModel.getId();
        this.productName=salesOrderProductDetailsModel.getProductName();
        this.productType=salesOrderProductDetailsModel.getProductType();
        this.quantity=salesOrderProductDetailsModel.getQuantity();
        this.price=salesOrderProductDetailsModel.getPrice();
        this.total=salesOrderProductDetailsModel.getTotal();
        this.salesOrderCompanyId=salesOrderProductDetailsModel.getSalesOrderCompanyId();
    }

    public SalesOrderProductDetailsDTO(String productName,String Hsc) {
        this.productName=productName;
        this.hsnCode=Hsc;
    }
}
