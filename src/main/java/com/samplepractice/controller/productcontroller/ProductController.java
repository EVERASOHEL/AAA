package com.samplepractice.controller.productcontroller;
import com.samplepractice.dto.productdto.ProductMaterDTO;
import com.samplepractice.services.productService.ProductService;
import com.samplepractice.util.Impl.CommonResponse;
import com.samplepractice.validator.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/productController")
public class ProductController {

    private String moduleName="Product";

    @Autowired
    private ProductService productService;

    @PostMapping("/saveNewProduct")
    public ResponseEntity<?> saveNewProduct(@RequestBody List<ProductMaterDTO> productMaterDTO){
        try {
            return CommonResponse.getData(productService.saveOrUpdateProduct(productMaterDTO));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getProductList")
    public ResponseEntity<?> productList(Pageable pageable){
        try {
            return CommonResponse.getData(productService.getAllProduct(pageable));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getProductListWithoutPagination")
    public ResponseEntity<?> productListwithoutPagination(){
        try {
            return CommonResponse.getData(productService.getAllProduct());
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer productId){
        try {
            return CommonResponse.getData(productService.DeleteProduct(productId));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getProductNameList")
    public ResponseEntity<?> getPriductNamelist() {
        try {
            return CommonResponse.getData(productService.getAllProductName());
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }
}
