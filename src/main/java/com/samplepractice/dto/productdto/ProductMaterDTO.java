package com.samplepractice.dto.productdto;

import com.samplepractice.model.productmodels.ProductModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductMaterDTO {

    private Integer id;
    private String productName;
    private Float sellingPrice;
    private Float costPrice;
    private String productHsn;
    private String gstPercentage;
    private String productType;
    private Long totalcount;
    private Long stockOnHand;
    private Float totalStock;

    public ProductMaterDTO(Object[] list) {
        this.id = Integer.parseInt(list[0].toString());
        this.productName = (String) list[1];
        this.sellingPrice = Float.parseFloat(list[2].toString());
        this.costPrice = Float.parseFloat(list[3].toString());
        this.productHsn = (String) list[4];
        this.gstPercentage = (String) list[5];
        this.productType = (String) list[6];
        this.totalcount = Long.parseLong(list[8].toString());
        this.totalStock = list[9] != null ? Float.parseFloat(list[9].toString()) : 0f;
    }

    public ProductMaterDTO(ProductModel productModel) {
        this.id = productModel.getId();
        this.productName = productModel.getProductName();
        this.sellingPrice = productModel.getSellingPrice();
        this.costPrice = productModel.getCostPrice();
        this.productHsn = productModel.getProductHsn();
        this.gstPercentage = productModel.getGstPercentage();
        this.productType = productModel.getProductType();
    }

    public ProductMaterDTO(ProductMaterDTO productModel, Long stockOnHand) {
        this.id = productModel.getId();
        this.productName = productModel.getProductName();
        this.sellingPrice = productModel.getSellingPrice();
        this.costPrice = productModel.getCostPrice();
        this.productHsn = productModel.getProductHsn();
        this.gstPercentage = productModel.getGstPercentage();
        this.productType = productModel.getProductType();
        this.stockOnHand = stockOnHand;
    }
}
