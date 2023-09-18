package com.samplepractice.controller.salesordercontroller;

import com.itextpdf.text.DocumentException;
import com.samplepractice.dto.invoicedto.SalesPurchaseInvoiceDTO;
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

    @GetMapping("/read-pdfs")
    public List<String> readPDFs(@RequestParam("folderPath") String folderPath) throws IOException {
        return salesOrderService.readPdfDocumentsFromFolder("C:\\Users\\HP\\Downloads\\pdf");
    }

    @GetMapping("/generateSalesInvoice")
    public void generateSalesInvoice(HttpServletResponse response) throws DocumentException, IOException {
        pdfService.salesPdf(response);
    }

    @GetMapping("/generateSalesInvoice111")
    public void generateSalesInvoice(HttpServletRequest req, HttpServletResponse res) throws JRException, IOException {

        /*List<SalesOrderCompanyDTO> salesOrderCompanyDTOS = new ArrayList<>();
        SalesOrderCompanyDTO md = new SalesOrderCompanyDTO();
        md.setCompanyName("test");

        md.setInvoice_type("Original Copy");
        md.setVoucherNo("INV777189");
        md.setInvoice_type("INV001");
        md.setInvoice_date("12-10-2000");
        md.setOrderDateString("12-10-2000");

        md.setCompanyName("H.K. INDUSTRIAL CORPORATION");
        md.setAddress("MAIN ROAD RANI BAZAR, NEAR SBI BANK, BIKANER," +
                "RAJASTHAN, 334001");
        md.setStateName("RAJASTHAN");
        md.setCompanyGstNo("08ACGPP1333B1Z2");
        md.setCompanyPhoneNumber("919023438923");

        List<SalesOrderCompanyDTO> salesOrderProductDetailsDTOList = new ArrayList<>();

        salesOrderProductDetailsDTOList.add(new SalesOrderCompanyDTO("contactor", 1250.25f));
        salesOrderProductDetailsDTOList.add(new SalesOrderCompanyDTO("Mongus", 2050.56f));
        salesOrderProductDetailsDTOList.add(new SalesOrderCompanyDTO("Ath Empier", 1250786.25f));

//        List<SalesOrderCompanyDTO> dataList = salesOrderProductDetailsDTOList;
//        CustomDataSource dataSource = new CustomDataSource(dataList);

        md.setSales_product_list(salesOrderProductDetailsDTOList);
//        md.setSales_product_list1(dataSource);

//        md.setSproduct("C:\\Users\\HP\\Downloads\\samplepractice\\samplepractice\\src\\main\\webapp\\jasper\\sales_data.jasper");

        salesOrderCompanyDTOS.add(md); */

        List<SalesPurchaseInvoiceDTO> sales_product_list = new ArrayList<>();

        SalesPurchaseInvoiceDTO s1 = new SalesPurchaseInvoiceDTO();
        s1.setCompanyName("H.K. INDUSTRIAL CORPORATION\n" +
                "MAIN ROAD RANI BAZAR, NEAR SBI BANK, BIKANER,\n" +
                "RAJASTHAN, 334001");
        s1.setProductName("machine");
        s1.setProductType("Pcs.");
        s1.setHsnCode("234ND3IMS");
        s1.setQuantityString(String.valueOf(2f));
        s1.setPriceString(String.valueOf(320f));
        s1.setTotalString(String.valueOf(640f));
        s1.setTotalAmountinword("Forty One Thousand Nine Hundred Fourteen INR Only");

        SalesPurchaseInvoiceDTO s2 = new SalesPurchaseInvoiceDTO();
        s2.setCompanyName("H.K. INDUSTRIAL CORPORATION\n" +
                "MAIN ROAD RANI BAZAR, NEAR SBI BANK, BIKANER,\n" +
                "RAJASTHAN, 334001");
        s2.setProductName("machine1");
        s2.setProductType("Pcs.");
        s2.setHsnCode("SDJK83NDS3D");
        s2.setQuantityString(String.valueOf(1f));
        s2.setPriceString(String.valueOf(220f));
        s2.setTotalString(String.valueOf(220f));
        s2.setTotalAmountinword("Forty One Thousand Nine Hundred Fourteen INR Only");

        SalesPurchaseInvoiceDTO s3 = new SalesPurchaseInvoiceDTO();
        s3.setCompanyName("H.K. INDUSTRIAL CORPORATION\n" +
                "MAIN ROAD RANI BAZAR, NEAR SBI BANK, BIKANER,\n" +
                "RAJASTHAN, 334001");
        s3.setProductName("");
        s3.setProductType("");
        s3.setHsnCode("");
        s3.setQuantityString("");
        s3.setPriceString("");
        s3.setTotalString("");
        s3.setTotalAmountinword("Forty One Thousand Nine Hundred Fourteen INR Only");

        SalesPurchaseInvoiceDTO s4 = new SalesPurchaseInvoiceDTO();
        s4.setCompanyName("H.K. INDUSTRIAL CORPORATION\n" +
                "MAIN ROAD RANI BAZAR, NEAR SBI BANK, BIKANER,\n" +
                "RAJASTHAN, 334001");
        s4.setProductName("");
        s4.setProductType("");
        s4.setHsnCode("");
        s4.setQuantityString("");
        s4.setPriceString("");
        s4.setTotalString("");
        s4.setTotalAmountinword("Forty One Thousand Nine Hundred Fourteen INR Only");

        sales_product_list.add(s2);
        sales_product_list.add(s1);
        sales_product_list.add(s3);
        sales_product_list.add(s4);

        FileInputStream fileInputStream = null;
        File jasperFile = null;
        jasperFile = new File("C:\\Users\\HP\\Downloads\\samplepractice\\samplepractice\\src\\main\\webapp\\jasper\\salesInvoice.jasper");
        fileInputStream = new FileInputStream(jasperFile);

//        String mainReport = "C:\\Users\\HP\\Downloads\\samplepractice\\samplepractice\\src\\main\\webapp\\jasper\\sales_data.jasper";
//        String subReport = "C:\\Users\\HP\\Downloads\\samplepractice\\samplepractice\\src\\main\\webapp\\jasper\\salesInvoice.jasper";

//        JRBeanCollectionDataSource beanColDataSource = new
//                JRBeanCollectionDataSource(salesOrderCompanyDTOS);
//
//        JasperReport jasperMasterReport = JasperCompileManager
//                .compileReport(mainReport);
//        JasperReport jasperSubReport = JasperCompileManager
//                .compileReport(subReport);
//
//        Map<String, Object> parameters = new HashMap<String, Object>();
//        parameters.put("sales_product_list", jasperSubReport);
//        JasperFillManager.fillReportToFile(String.valueOf(jasperMasterReport),
//                 parameters, beanColDataSource);

        try {

            JasperReport jasperReport = (JasperReport) JRLoader.loadObject(fileInputStream);
            JRDataSource jrdatasource = new JRBeanCollectionDataSource(sales_product_list);
            JasperPrint jpPrintObj = JasperFillManager.fillReport(jasperReport, new HashMap<>(), jrdatasource);
            byte[] pdfFile = JasperExportManager.exportReportToPdf(jpPrintObj);

            res.setContentType("application/pdf");
            res.setHeader("Content-Disposition", "attachment;filename=\"sales_invoice.pdf\"");
            res.setContentLength(pdfFile.length);
            ServletOutputStream out = res.getOutputStream();
            out.write(pdfFile);
            out.flush();
            out.close();

        } catch (Exception e) {
            System.out.println("error : " + e);
        }
    }
}
