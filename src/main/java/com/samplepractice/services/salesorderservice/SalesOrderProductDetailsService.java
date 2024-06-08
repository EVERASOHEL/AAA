package com.samplepractice.services.salesorderservice;

import com.samplepractice.dto.salesorderdto.SalesOrderProductDetailsDTO;
import com.samplepractice.model.salesordermodel.SalesOrderProductDetailsModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesOrderProductDetailsService {

    List<SalesOrderProductDetailsModel> saveSalesOrderProductDetails(List<SalesOrderProductDetailsDTO> salesOrderProductDetailsDTOList,String companyType,String transactionalFlag);

    List<SalesOrderProductDetailsDTO> getProductDetailsRecordforUpdate(Long id);
}
