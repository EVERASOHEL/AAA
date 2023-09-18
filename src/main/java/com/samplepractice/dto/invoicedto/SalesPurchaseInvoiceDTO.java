package com.samplepractice.dto.invoicedto;

import com.samplepractice.dto.sample.sampleCompanyDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SalesPurchaseInvoiceDTO extends sampleCompanyDto {

    private Long id;
    private String productName;
    private String productType;
    private Float quantity;
    private String quantityString;
    private Float price;
    private String priceString;
    private Float total;
    private String totalString;
    private Long salesOrderCompanyId;
    private String hsnCode;
    private String totalAmountinword;

    public SalesPurchaseInvoiceDTO(String productName, Float qty, Float price) {
        this.productName=productName;
        this.quantity=qty;
        this.price=price;
    }
}
