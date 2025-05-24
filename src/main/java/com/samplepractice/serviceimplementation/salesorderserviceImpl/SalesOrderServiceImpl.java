package com.samplepractice.serviceimplementation.salesorderserviceImpl;

import com.google.common.base.Strings;
//import org.apache.
import com.samplepractice.config.Constants;
import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;
import com.samplepractice.dto.salesorderdto.SalesOrderProductDetailsDTO;
import com.samplepractice.model.salesordermodel.SalesOrderCompanyModel;
import com.samplepractice.model.salesordermodel.SalesOrderProductDetailsModel;
import com.samplepractice.repository.salesorderRepository.SalesOrderCompanyRepository;
import com.samplepractice.services.companyService.CompanyService;
import com.samplepractice.services.pdfservice.PdfService;
import com.samplepractice.services.salesorderservice.SalesOrderProductDetailsService;
import com.samplepractice.services.salesorderservice.SalesOrderService;
import com.samplepractice.util.handleLog.LoggingUtility;
import com.samplepractice.validator.AppException;
import com.samplepractice.validator.CommonValidatorAppException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class SalesOrderServiceImpl implements SalesOrderService {

    @Autowired
    private SalesOrderCompanyRepository salesOrderCompanyRepository;

    @Autowired
    private SalesOrderProductDetailsService salesOrderProductDetailsService;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private LoggingUtility loggingUtility;

    private static final Logger logger = LoggerFactory.getLogger(SalesOrderServiceImpl.class);

    @Override
    @Transactional
    public String saveSalesOrder(SalesOrderCompanyDTO salesOrderCompanyDTO) throws Exception {

        loggingUtility.logAndExecute("Starting sales order validation", () -> {
            try {
                salesOrderValidation(salesOrderCompanyDTO);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        String companyType = loggingUtility.logAndExecute("Fetching company type", () -> {
            return companyService.getCompanyTypeByCompanyName(salesOrderCompanyDTO.getCompanyName());
        });

        SalesOrderCompanyModel salesOrderCompanyModel = loggingUtility.logAndExecute("Saving sales order company model", () -> {
            return salesOrderCompanyRepository.save(new SalesOrderCompanyModel(salesOrderCompanyDTO));
        });

        List<SalesOrderProductDetailsDTO> salesOrderProductDetailsDTOSList = salesOrderCompanyDTO.getSalesOrderProductDetailsDTOList();

        List<SalesOrderProductDetailsDTO> salesproductlist = salesOrderProductDetailsDTOSList.stream()
                .map(list -> new SalesOrderProductDetailsDTO(list, salesOrderCompanyModel.getId()))
                .collect(Collectors.toList());

        final List<SalesOrderProductDetailsModel> salesOrderProductDetailsModels = loggingUtility.logAndExecute("Saving sales order product details", () -> {
            return salesOrderProductDetailsService.saveSalesOrderProductDetails(salesproductlist, companyType,
                    Objects.nonNull(salesOrderCompanyDTO.getId()) ? "U" : "N");
        });

        loggingUtility.logAndExecute("Generating PDF for sales order", () -> {
            try {
                pdfService.salesPdf(salesOrderCompanyDTO, companyType);
            } catch (Exception e) {
                throw new AppException(e.getMessage());
            }
        });

        return Objects.isNull(salesOrderCompanyDTO.getId()) ? "Sales Order Successfully Created!" : "Sales Order Successfully Updated!";
    }

    public void salesOrderValidation(SalesOrderCompanyDTO salesOrderCompanyDTO) throws Exception {

        CommonValidatorAppException.stringsIsNullOrEmpty("order Date", salesOrderCompanyDTO.getOrderDate().toString());
        CommonValidatorAppException.stringsIsNullOrEmpty("Voucher No", salesOrderCompanyDTO.getVoucherNo());
        CommonValidatorAppException.stringsIsNullOrEmpty("Company Name", salesOrderCompanyDTO.getCompanyName());
        CommonValidatorAppException.objectsIsNullAndIsDigit("Total Amount", salesOrderCompanyDTO.getTotalAmount());
        CommonValidatorAppException.objectsIsNullAndIsDigit("Total Taxable Amount", salesOrderCompanyDTO.getTotalTaxableAmount());
        CommonValidatorAppException.objectsIsNullAndIsDigit("Total Tax Amount", salesOrderCompanyDTO.getTotalTaxAmount());

    }

    @Override
    @Transactional
    public Page<SalesOrderCompanyDTO> getAllSalesOrderList(Pageable pageable, String companyType, Map<String, String> filters) {

        String companayName=filters.getOrDefault("companyName", null);

        logger.info("Starting transaction to fetch all sales orders for company type: {}", companyType);
        entityManager.joinTransaction();

        String queryString = "select soc.*,count(soc.id) over() as totalcount,sum(vp.payamount) as payamount from tbl_salesordercompany soc" +
                " left join tbl_vendor_payment vp on soc.id=vp.orderid where soc.companyname in " +
                "(select c.companyname from company c where c.companytype=cast(:companyType AS text)) " +
                "AND (:companyName is null or soc.companyname=cast(:companyName as varchar))"+
                " GROUP BY soc.id, soc.companyname, soc.createddate order by soc.createddate desc";

        if (Objects.nonNull(pageable)) {
            queryString = queryString + " OFFSET :firstElement ROWS FETCH NEXT :maxElement ROWS ONLY";
            logger.info("Query with pagination: {}", queryString);
        } else {
            logger.info("Query without pagination: {}", queryString);
        }

        Query query = entityManager.createNativeQuery(queryString);
        query.setParameter("companyType", !Strings.isNullOrEmpty(companyType) ? companyType : null);
        query.setParameter("companyName", !Strings.isNullOrEmpty(companayName) ? companayName : null);

        logger.info("Set companyType parameter to: {}", companyType);

        if (Objects.nonNull(pageable)) {
            query.setParameter("firstElement", pageable.getPageNumber() * pageable.getPageSize());
            query.setParameter("maxElement", pageable.getPageSize());
            logger.info("Set pagination parameters: firstElement={}, maxElement={}", pageable.getPageNumber() * pageable.getPageSize(), pageable.getPageSize());
        }

        List<Object[]> resultList;
        try {
            resultList = query.getResultList();
            logger.info("Query executed successfully. Number of results: {}", resultList.size());
        } catch (Exception e) {
            logger.error("Error executing query: {}", e.getMessage());
            throw e;
        }

        List<SalesOrderCompanyDTO> salesOrderCompanyDTOS = new ArrayList<>();
        resultList.forEach(list -> salesOrderCompanyDTOS.add(new SalesOrderCompanyDTO((Object[]) list)));
        logger.info("Converted result set to DTOs. Number of DTOs: {}", salesOrderCompanyDTOS.size());

        if (Objects.isNull(pageable)) {
            if (salesOrderCompanyDTOS.isEmpty()) {
                pageable = PageRequest.of(0, 1);
            } else {
                pageable = PageRequest.of(0, salesOrderCompanyDTOS.size());
            }
        }

        if (salesOrderCompanyDTOS.isEmpty()) {
            logger.info("No sales orders found.");
            return new PageImpl<>(new ArrayList<>(), pageable, 0);
        }

        logger.info("Returning page with sales orders. Total count: {}", salesOrderCompanyDTOS.get(0).getTotalcount());
        return new PageImpl<>(salesOrderCompanyDTOS, pageable, salesOrderCompanyDTOS.get(0).getTotalcount());
    }

    @Override
    public List<String> readPdfDocumentsFromFolder(String folderPath) throws IOException {
        List<String> pdfContents = new ArrayList<>();

        File folder = new File(folderPath);
        File[] files = folder.listFiles();

        if (files != null) {
            for (File file : files) {
                if (file.isFile() && file.getName().toLowerCase().endsWith(".pdf")) {
                    pdfContents.add(readPdfContent(file));
                }
            }
        }

        return pdfContents;
    }

    public String getLastVoucherNo(String companyType, String voucherNo) throws Exception {
        try {
            // Ensure non-null companyType
            CommonValidatorAppException.stringsIsNullOrEmpty("Please enter company name.", companyType);

            // Call the custom repository method
            String voucherNoDesc = salesOrderCompanyRepository.getLastVoucherNo(
                    (companyType != null && !companyType.equalsIgnoreCase("null")) ? companyType : null,
                    (voucherNo != null && !voucherNo.equalsIgnoreCase("null")) ? voucherNo : null
            );

            // Check if the voucherNoDesc is not null or empty
            return (voucherNoDesc != null && !voucherNoDesc.isEmpty()) ? voucherNoDesc : "0001";
        } catch (Exception e) {
            // Handle exceptions appropriately
            e.printStackTrace();
            throw new Exception("Error fetching voucher number.", e);
        }
    }

    private String readPdfContent(File pdfFile) throws IOException {
        try (PDDocument document = PDDocument.load(pdfFile)) {
            PDFTextStripper pdfTextStripper = new PDFTextStripper();
            return pdfTextStripper.getText(document);
        }
    }
}
