package com.samplepractice.serviceimplementation.salesorderserviceImpl;

import com.google.common.base.Strings;
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

import java.util.*;
import java.util.function.Function;
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
    public List<SalesOrderProductDetailsModel> saveSalesOrderProductDetails(List<SalesOrderProductDetailsDTO> salesOrderProductDetailsDTOList, String companyType, String transactionalFlag) {

        if (salesOrderProductDetailsDTOList == null || salesOrderProductDetailsDTOList.isEmpty()) {
            return null;
        }

        Long salesOrderCompanyId = salesOrderProductDetailsDTOList.get(0).getSalesOrderCompanyId();

        // Convert DTOs to Model objects
        List<SalesOrderProductDetailsModel> productDetailsModelList = salesOrderProductDetailsDTOList.stream()
                .map(SalesOrderProductDetailsModel::new)
                .collect(Collectors.toList());

        // Retrieve existing stock for all products
        List<String> listOfProducts = productDetailsModelList.stream()
                .map(SalesOrderProductDetailsModel::getProductName)
                .collect(Collectors.toList());
        List<ProductStockModel> allStock = productStockRepository.findAll();
//        List<ProductStockModel> allStock = productStockRepository.findAllByProductNameInOrderByProductName(listOfProducts);

        // Create a list to store updated stock information
        List<ProductStockModel> updatedStockList = new ArrayList<>();

        // Manage stock for new sales orders (if adding a new purchase)
        if ("N".equalsIgnoreCase(transactionalFlag)) {
            for (SalesOrderProductDetailsModel detail : productDetailsModelList) {
                ProductStockModel stockModel = allStock.stream()
                        .filter(stock -> stock.getProductName().equals(detail.getProductName()))
                        .findFirst()
                        .orElse(null);

                if (stockModel != null) {
                    float newStockQuantity = companyType.equals("Customer") ?
                            stockModel.getTotalStock() - detail.getQuantity() :
                            stockModel.getTotalStock() + detail.getQuantity();

                    stockModel.setTotalStock(newStockQuantity); // Update stock quantity
                    updatedStockList.add(stockModel);
                }
            }
        }

        // Manage stock for updated sales orders
        if ("U".equalsIgnoreCase(transactionalFlag)) {
            // Case 1: Remove matching items from both old and new lists
            List<SalesOrderProductDetailsModel> oldProductDetailsList = salesOrderProductDetailsRepository.findSalesOrderProductDetailsModelByIdOrderByProductName(salesOrderCompanyId);
            List<SalesOrderProductDetailsModel> oldProductDetailsFiltered = new ArrayList<>(oldProductDetailsList);
            List<SalesOrderProductDetailsModel> remainingNewProductDetails = new ArrayList<>(productDetailsModelList);

            Iterator<SalesOrderProductDetailsModel> case2OldIterator = oldProductDetailsFiltered.iterator();
            while (case2OldIterator.hasNext()) {
                SalesOrderProductDetailsModel oldDetail = case2OldIterator.next();

                Iterator<SalesOrderProductDetailsModel> newIterator = remainingNewProductDetails.iterator();
                while (newIterator.hasNext()) {
                    SalesOrderProductDetailsModel newDetail = newIterator.next();

                    if (oldDetail.getProductName().equals(newDetail.getProductName()) &&
                            oldDetail.getQuantity().equals(newDetail.getQuantity())) {

                        manageStockForEqualProducts(oldDetail, newDetail, allStock);

                        case2OldIterator.remove(); // Remove from old list
                        newIterator.remove(); // Remove from new list
                        break;
                    }
                }
            }

            // Case 3: Manage stock for non-matching items
            // Iterate over oldProductDetailsFiltered and remainingNewProductDetails simultaneously
            Iterator<SalesOrderProductDetailsModel> oldIterator = oldProductDetailsFiltered.iterator();
            Iterator<SalesOrderProductDetailsModel> newIterator = remainingNewProductDetails.iterator();

            while (oldIterator.hasNext() && newIterator.hasNext()) {
                SalesOrderProductDetailsModel oldDetailsModel = oldIterator.next();
                SalesOrderProductDetailsModel newDetailsModel = newIterator.next();

                // Check if product names match (case-insensitive)
                if (oldDetailsModel.getProductName().equalsIgnoreCase(newDetailsModel.getProductName())) {
                    float oldQuantity = oldDetailsModel.getQuantity();
                    float newQuantity = newDetailsModel.getQuantity();

                    ProductStockModel stockModel = allStock.stream()
                            .filter(stock -> stock.getProductName().equalsIgnoreCase(newDetailsModel.getProductName()))
                            .findFirst()
                            .orElse(null);

                    if (stockModel != null) {
                        float deltaQuantity = newQuantity - oldQuantity;
                        float newStockQuantity = stockModel.getTotalStock() + deltaQuantity;
                        stockModel.setTotalStock(newStockQuantity); // Update stock quantity
                        updatedStockList.add(stockModel);
                    }

                    oldIterator.remove();
                    newIterator.remove();
                }
            }

            // Process remaining entries in oldProductDetailsFiltered
            for (SalesOrderProductDetailsModel oldDetailsModel : oldProductDetailsFiltered) {
                ProductStockModel stockModel = allStock.stream()
                        .filter(stock -> stock.getProductName().equalsIgnoreCase(oldDetailsModel.getProductName()))
                        .findFirst()
                        .orElse(null);

                if (stockModel != null) {
                    float newStockQuantity = stockModel.getTotalStock() - oldDetailsModel.getQuantity();
                    stockModel.setTotalStock(newStockQuantity); // Update stock quantity
                    updatedStockList.add(stockModel);
                }
            }

            // Process remaining entries in remainingNewProductDetails
            for (SalesOrderProductDetailsModel newDetailsModel : remainingNewProductDetails) {
                ProductStockModel stockModel = allStock.stream()
                        .filter(stock -> stock.getProductName().equalsIgnoreCase(newDetailsModel.getProductName()))
                        .findFirst()
                        .orElse(null);

                if (stockModel != null) {
                    float newStockQuantity = stockModel.getTotalStock() + newDetailsModel.getQuantity();
                    stockModel.setTotalStock(newStockQuantity); // Update stock quantity
                    updatedStockList.add(stockModel);
                }
            }
        }

        // Save updated stock information
        productStockRepository.saveAll(updatedStockList);

        // Save product details
        List<SalesOrderProductDetailsModel> oldProductDetailsList = salesOrderProductDetailsRepository.findSalesOrderProductDetailsModelByIdOrderByProductName(salesOrderCompanyId);

        oldProductDetailsList.stream()
                .filter(oldProductDetail -> !productDetailsModelList.contains(oldProductDetail))
                .forEach(salesOrderProductDetailsModel -> salesOrderProductDetailsRepository.delete(salesOrderProductDetailsModel));

        List<SalesOrderProductDetailsModel> savedProductDetails = salesOrderProductDetailsRepository.saveAll(productDetailsModelList);

        return savedProductDetails;
    }

    // Stock management logic for equal products
    private void manageStockForEqualProducts(SalesOrderProductDetailsModel oldDetail, SalesOrderProductDetailsModel newDetail, List<ProductStockModel> allStock) {
        for (ProductStockModel stockModel : allStock) {
            if (stockModel.getProductName().equals(oldDetail.getProductName())) {
                float diffQuantity = newDetail.getQuantity() - oldDetail.getQuantity();
                float newStockQuantity = stockModel.getTotalStock() + diffQuantity;
                stockModel.setTotalStock(newStockQuantity); // Update stock quantity
            }
        }
    }

    @Override
    public List<SalesOrderProductDetailsDTO> getProductDetailsRecordforUpdate(Long id) {
        List<SalesOrderProductDetailsModel> salesProductDetailsModelList = salesOrderProductDetailsRepository.findRecordProductDetailsById(id);
        return salesProductDetailsModelList.stream().map(SalesOrderProductDetailsDTO::new).collect(Collectors.toList());
    }
}
