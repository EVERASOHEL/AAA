package com.samplepractice.serviceimplementation.salesorderserviceImpl;

import com.samplepractice.dto.salesorderdto.SalesOrderProductDetailsDTO;
import com.samplepractice.model.productmodels.ProductStockModel;
import com.samplepractice.model.salesordermodel.SalesOrderProductDetailsModel;
import com.samplepractice.repository.productRepository.ProductStockRepository;
import com.samplepractice.repository.salesorderRepository.SalesOrderProductDetailsRepository;
import com.samplepractice.services.salesorderservice.SalesOrderProductDetailsService;
import io.jsonwebtoken.lang.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SalesOrderProductDetailsServiceImpl implements SalesOrderProductDetailsService {

    @Autowired
    private SalesOrderProductDetailsRepository salesOrderProductDetailsRepository;

    @Autowired
    private ProductStockRepository productStockRepository;

    @Override
    @Transactional
    public List<SalesOrderProductDetailsModel> saveSalesOrderProductDetails(List<SalesOrderProductDetailsDTO> salesOrderProductDetailsDTOList, String companyType) {

        if (Objects.isNull(salesOrderProductDetailsDTOList) || Collections.isEmpty(salesOrderProductDetailsDTOList)) {
            return null;
        }

        List<SalesOrderProductDetailsModel> productDetailsModelList = salesOrderProductDetailsDTOList.stream().map(SalesOrderProductDetailsModel::new).collect(Collectors.toList());
        List<SalesOrderProductDetailsModel> salesOrderProductDetailsModels = salesOrderProductDetailsRepository.saveAll(productDetailsModelList);

        List<ProductStockModel> allstock = productStockRepository.findAll();

        List<ProductStockModel> newlist = new ArrayList<>();

        for (ProductStockModel stockModel :
                allstock) {
            for (SalesOrderProductDetailsModel detailsModel : salesOrderProductDetailsModels) {
                if (stockModel.getProductName().equals(detailsModel.getProductName())) {
                    newlist.add(new ProductStockModel(
                                    stockModel.getId(),
                                    stockModel.getProductName(),
                                    companyType.equals("Customer")
                                            ?
                                            (stockModel.getTotalStock() - detailsModel.getQuantity())
                                            :
                                            (stockModel.getTotalStock() + detailsModel.getQuantity()),
                                    stockModel.getProductId()
                            )
                    );
                }
            }
        }
        productStockRepository.saveAll(newlist);
//        if (!Collections.isEmpty(allstock)) {
//
//            List<ProductStockModel> MatchDataWithStockItems = allstock.stream().filter(list -> salesOrderProductDetailsModels.stream().map(SalesOrderProductDetailsModel::getProductName).anyMatch(name -> name.equals(list.getProductName()))).collect(Collectors.toList());
//
//            List<SalesOrderProductDetailsModel> notMatchDataWithStockItems = salesOrderProductDetailsModels.stream().filter(list -> allstock.stream().map(ProductStockModel::new).anyMatch(name -> !name.equals(list.getProductName()))).collect(Collectors.toList());
//
//            List<ProductStockModel> newlist = new ArrayList<>();
//            for (ProductStockModel stockModel :
//                    MatchDataWithStockItems) {
//                for (SalesOrderProductDetailsModel detailsModel : salesOrderProductDetailsModels) {
//                    if (detailsModel.getProductName().equals(stockModel.getProductName())) {
//                        newlist.add(new ProductStockModel(stockModel.getId(),stockModel.getProductName(), (companyType.equals("Customer") ? (stockModel.getTotalStock() - detailsModel.getQuantity()) : (stockModel.getTotalStock() + detailsModel.getQuantity()))));
//                    }
//                }
//            }
//            if (!Collections.isEmpty(notMatchDataWithStockItems)) {
//                for (SalesOrderProductDetailsModel detailsModel :
//                        notMatchDataWithStockItems) {
//                    newlist.add(new ProductStockModel(detailsModel));
//                }
//            }
//            productStockRepository.saveAll(newlist.stream().map(ProductStockModel::new).collect(Collectors.toList()));
//        } else {
//            productStockRepository.saveAll(productDetailsModelList.stream().map(list-> new ProductStockModel(list)).collect(Collectors.toList()));
//        }
        return salesOrderProductDetailsModels;
    }

    @Override
    public List<SalesOrderProductDetailsDTO> getProductDetailsRecordforUpdate(Long id) {
        List<SalesOrderProductDetailsModel> salesProductDetailsModelList = salesOrderProductDetailsRepository.findRecordProductDetailsById(id);
        return salesProductDetailsModelList.stream().map(SalesOrderProductDetailsDTO::new).collect(Collectors.toList());
    }
}
