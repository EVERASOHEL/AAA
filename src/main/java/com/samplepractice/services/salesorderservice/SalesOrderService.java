package com.samplepractice.services.salesorderservice;

import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Repository
public interface SalesOrderService {

    String saveSalesOrder(SalesOrderCompanyDTO salesOrderCompanyDTO) throws Exception;

    Page<SalesOrderCompanyDTO> getAllSalesOrderList(Pageable pageable, String companyType, Map<String, String> filters);

    List<String> readPdfDocumentsFromFolder(String folderPath) throws IOException;

    String getLastVoucherNo(String companyType,String voucherNo) throws Exception;
}
