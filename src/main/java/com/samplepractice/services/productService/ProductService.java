package com.samplepractice.services.productService;

import com.samplepractice.dto.productdto.ProductMaterDTO;
import com.samplepractice.model.commondto.TitleValueDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    String saveOrUpdateProduct(List<ProductMaterDTO> productMaterDTO) throws Exception;
    Page<ProductMaterDTO> getAllProduct(Pageable pageable);
    String DeleteProduct(Integer id);
    List<ProductMaterDTO> getAllProduct();
    List<TitleValueDTO> getAllProductName();
}
