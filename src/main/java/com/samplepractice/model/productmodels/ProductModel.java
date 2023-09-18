package com.samplepractice.model.productmodels;

import com.samplepractice.dto.productdto.ProductMaterDTO;
import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "`tbl_product`")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("0")
public class ProductModel extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Integer id;

    @Column(name = "productname")
    private String productName;

    @Column(name = "sellingprice")
    private Float sellingPrice;

    @Column(name = "costprice")
    private Float costPrice;

    @Column(name = "producthsn")
    private String productHsn;

    @Column(name = "gsttype")
    private String gstPercentage;

    @Column(name = "producttype")
    private String productType;

    public ProductModel(ProductMaterDTO productMaterDTO){
        this.id= Objects.nonNull(productMaterDTO.getId()) ? productMaterDTO.getId() : null;
        this.productName=productMaterDTO.getProductName();
        this.sellingPrice=productMaterDTO.getSellingPrice();
        this.costPrice=productMaterDTO.getCostPrice();
        this.productHsn=productMaterDTO.getProductHsn();
        this.gstPercentage=productMaterDTO.getGstPercentage();
        this.productType=productMaterDTO.getProductType();
    }

}
