package com.samplepractice.repository.productRepository;

import com.samplepractice.dto.productdto.ProductMaterDTO;
import com.samplepractice.model.commondto.TitleValueDTO;
import com.samplepractice.model.productmodels.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Integer> {

    @Query(nativeQuery = true,value = "select productname from tbl_product")
    List<String> getAllProductName();

    @Query(nativeQuery = true,value = "select productname from tbl_product")
    List<ProductModel> getAllProductListwithProductStock();

}
