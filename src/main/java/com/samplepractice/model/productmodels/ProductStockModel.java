package com.samplepractice.model.productmodels;

import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import com.samplepractice.model.salesordermodel.SalesOrderProductDetailsModel;
import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "`tbl_productstock`")
@Setter
@Getter
//@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("0")
public class ProductStockModel extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "productname")
    private String productName;

    @Column(name = "totalstock")
    private Float totalStock;

    @Column(name = "productid")
    private Integer productId;

    //    when sales or update then chnage stock value
    public ProductStockModel(Long stockid, String productName, Float stockvalue, Integer productId) {
        this.id = stockid;
        this.productName = productName;
        this.totalStock = stockvalue;
        this.productId = productId;
    }

    //    when update productstock productname
    public ProductStockModel(Long id, String productName, Integer productId) {
        this.id = id;
        this.productName = productName;
        this.productId = productId;
    }

    //    add new product stock data
    public ProductStockModel(String productName, Float defaultstock, Integer productId) {
        this.productName = productName;
        this.totalStock = defaultstock;
        this.productId = productId;
    }
}
