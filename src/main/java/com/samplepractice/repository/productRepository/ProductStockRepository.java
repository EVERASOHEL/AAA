package com.samplepractice.repository.productRepository;

import com.samplepractice.model.productmodels.ProductStockModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductStockRepository extends JpaRepository<ProductStockModel,Long> {

    @Query(nativeQuery = true,value = "select * from tbl_productstock where productid=CAST(:productId AS INTEGER)")
    ProductStockModel findProductStockDataByProductId(Integer productId);

    List<ProductStockModel> findAllByProductNameInOrderByProductName(List<String> productNames);


}