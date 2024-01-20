package com.samplepractice.controller.salesordercontroller;

import com.itextpdf.text.DocumentException;
import com.samplepractice.dto.invoicedto.SalesPurchaseInvoiceDTO;
import com.samplepractice.dto.pdfdto.ViewPdfDTO;
import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;
import com.samplepractice.services.pdfservice.PdfService;
import com.samplepractice.services.salesorderservice.SalesOrderProductDetailsService;
import com.samplepractice.services.salesorderservice.SalesOrderService;
import com.samplepractice.util.Impl.CommonResponse;
import com.samplepractice.validator.AppException;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/salesOrderController")
public class SalesOrderController {

    private String moduleName = "SalesOrder";

    @Autowired
    private SalesOrderService salesOrderService;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private SalesOrderProductDetailsService salesOrderProductDetailsService;

    private static final String PDF_FOLDER = "file:///C:/Users/HP/Downloads/";

    @Autowired
    private PdfService pdfService;

    @PostMapping("/saveSalesOrder")
    public ResponseEntity<?> saveOrderRequest(@RequestBody SalesOrderCompanyDTO salesOrderCompanyDTO) {
        try {
            return CommonResponse.getData(salesOrderService.saveSalesOrder(salesOrderCompanyDTO));
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @PostMapping("/savePurchaseOrder")
    public ResponseEntity<?> savePurchaseOrderRequest(@RequestBody SalesOrderCompanyDTO salesOrderCompanyDTO) {
        try {
            return CommonResponse.getData(salesOrderService.saveSalesOrder(salesOrderCompanyDTO));
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getSalesOrderList/{companyType}")
    public ResponseEntity<?> productList(@PathVariable String companyType, Pageable pageable) {
        try {
            return CommonResponse.getData(salesOrderService.getAllSalesOrderList(pageable, companyType));
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @PostMapping("/getProductDetailsByCompany/{companyId}")
    public ResponseEntity<?> getProductDetailsofCompanyforSalesOrder(@PathVariable Long companyId) {
        try {
            return CommonResponse.getData(salesOrderProductDetailsService.getProductDetailsRecordforUpdate(companyId));
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @PostMapping("/getSalesLastVoucherNo/{companyType}/{voucherNo}")
    public ResponseEntity<?> getLastVoucherNo(@PathVariable String companyType,@PathVariable String voucherNo) {
        try {
            return CommonResponse.getData(salesOrderService.getLastVoucherNo(companyType,voucherNo));
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @PostMapping("/viewPdf")
    public ResponseEntity<?> viewPdf(@RequestBody ViewPdfDTO viewPdfDTO) {
        try {
            byte[] bytes = pdfService.viewPdfByPartyAndVoucherNo(viewPdfDTO);
            if(bytes!=null){
                return CommonResponse.getData(bytes);
            }else{
                return CommonResponse.getData("pdf not found.");
            }
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @PostMapping("/sendMail")
    public ResponseEntity<?> sendMailPdf(@RequestBody ViewPdfDTO viewPdfDTO) {
        try {
            return CommonResponse.getData(pdfService.sendPdfEmail(viewPdfDTO));
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/generateSalesInvoice")
    public void generateSalesInvoice(HttpServletResponse response) throws DocumentException, IOException {
//        pdfService.salesPdf();
    }


}
