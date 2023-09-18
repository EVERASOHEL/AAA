package com.samplepractice.serviceimplementation.productserviceImpl;

import com.samplepractice.config.Constants;
import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.dto.productdto.ProductMaterDTO;
import com.samplepractice.model.commondto.TitleValueDTO;
import com.samplepractice.model.productmodels.ProductModel;
import com.samplepractice.model.productmodels.ProductStockModel;
import com.samplepractice.repository.productRepository.ProductRepository;
import com.samplepractice.repository.productRepository.ProductStockRepository;
import com.samplepractice.services.productService.ProductService;
import com.samplepractice.validator.AppException;
import com.samplepractice.validator.CommonValidatorAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProductServiceImpl implements ProductService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductStockRepository productStockRepository;

    @Override
    public String saveOrUpdateProduct(List<ProductMaterDTO> productMaterDTO) throws Exception {

        for (ProductMaterDTO productMaterDTO1 :
                productMaterDTO) {
            ProductValidation(productMaterDTO1);
        }

        List<ProductModel> productModelList = productMaterDTO.stream().map(ProductModel::new).collect(Collectors.toList());
        productRepository.saveAll(productModelList);

        if (Objects.nonNull(productMaterDTO.get(0).getId())) {

            productStockRepository.saveAll(productModelList.stream().map(list ->
                    new ProductStockModel(
                            productStockRepository.findProductStockDataByProductId(productMaterDTO.get(0).getId()).getId(),
                            list.getProductName(),
                            list.getId()
                    )
            ).collect(Collectors.toList()));

        } else {
            productStockRepository.saveAll(productModelList.stream().map(list ->
                    new ProductStockModel(
                            list.getProductName(),
                            0f,
                            list.getId()
                    )
            ).collect(Collectors.toList()));
        }

        return Objects.nonNull(productMaterDTO.get(0).getId()) ? "Product Successfully Updated!" : "Product Successfully Created!";
    }

    public void ProductValidation(ProductMaterDTO productMaterDTO) throws Exception {

        CommonValidatorAppException.stringsIsNullOrEmpty("Product Name", productMaterDTO.getProductName());
        if ((productMaterDTO.getProductName().isEmpty() || productMaterDTO.getProductName() == null) && productRepository.getAllProductName().stream().anyMatch(productMaterDTO.getProductName()::equals)) {
            throw new AppException(Constants.PRODUCT_NAME_ALREADY_EXITING);
        }
        CommonValidatorAppException.objectsIsNullAndIsDigit("Selling Price", productMaterDTO.getSellingPrice());
        CommonValidatorAppException.objectsIsNullAndIsDigit("Cost Price", productMaterDTO.getCostPrice());
        CommonValidatorAppException.stringsIsNullOrEmpty("HSN Code", productMaterDTO.getProductHsn());
        CommonValidatorAppException.stringsIsNullOrEmpty("GST Type", productMaterDTO.getGstPercentage());
        CommonValidatorAppException.stringsIsNullOrEmpty("Product Type", productMaterDTO.getProductType());

    }

//    public List<ProductMaterDTO> getProductListDatawithProductStock(){
//
//    }
//
    @Override
    @Transactional
    public Page<ProductMaterDTO> getAllProduct(Pageable pageable) {

        String queryString = "select cm.*,count(cm.id) over() as totalcount,ps.totalstock from tbl_product cm left join tbl_productstock ps on cm.id=ps.productid order by cm.createddate asc";

        if (Objects.nonNull(pageable)) {
            queryString = queryString + " OFFSET :firstElement ROWS FETCH NEXT :maxElement ROWS ONLY";
        }

        Query query = entityManager.createNativeQuery(queryString);

        if (Objects.nonNull(pageable)) {
            query.setParameter("firstElement", pageable.getPageNumber() * pageable.getPageSize());
            query.setParameter("maxElement", pageable.getPageSize());
        }

        List<Object[]> resultList = query.getResultList();
        List<ProductMaterDTO> productMaterDTOS = new ArrayList<>();
        resultList.forEach(list -> productMaterDTOS.add(new ProductMaterDTO((Object[]) list)));

        if (Objects.isNull(pageable)) {
            if (productMaterDTOS.size() == 0) {
                pageable = PageRequest.of(0, 1);
            } else {
                pageable = PageRequest.of(0, productMaterDTOS.size());
            }
        }
        if (io.jsonwebtoken.lang.Collections.isEmpty(productMaterDTOS)) {
            return new PageImpl<>(new ArrayList<>(), pageable, new ArrayList<>().size());
        }
        return new PageImpl<>(productMaterDTOS, pageable, productMaterDTOS.get(0).getTotalcount());
    }

    @Override
    public String DeleteProduct(Integer id) {
        productRepository.deleteById(id);
        return "Product Successfully Deleted!";
    }

    @Override
    @Transactional
    public List<ProductMaterDTO> getAllProduct() {

        String queryString = "select cm.*,count(cm.id) over() as totalcount,ps.totalstock from tbl_product cm left join tbl_productstock ps on cm.id=ps.productid order by cm.createddate asc";

        Query query = entityManager.createNativeQuery(queryString);

        List<Object[]> resultList = query.getResultList();
        List<ProductMaterDTO> productMaterDTOS = new ArrayList<>();
        resultList.forEach(list -> productMaterDTOS.add(new ProductMaterDTO((Object[]) list)));

//        List<ProductMaterDTO> getAllproductDTO = new ArrayList<>();
//        productRepository.findAll().forEach(list -> getAllproductDTO.add(new ProductMaterDTO(list)));
        return productMaterDTOS;
    }

    @Override
    public List<TitleValueDTO> getAllProductName() {
        return productRepository.getAllProductName().stream().map(TitleValueDTO::new).collect(Collectors.toList());
    }
}
