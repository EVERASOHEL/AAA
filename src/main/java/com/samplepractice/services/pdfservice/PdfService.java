package com.samplepractice.services.pdfservice;

import com.itextpdf.text.DocumentException;
import com.samplepractice.dto.pdfdto.ViewPdfDTO;
import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface PdfService {

    void salesPdf(SalesOrderCompanyDTO salesOrderCompanyDTO,String companyType) throws DocumentException, IOException;

    byte[] viewPdfByPartyAndVoucherNo(ViewPdfDTO viewPdfDTO) throws Exception;

    String sendPdfEmail(ViewPdfDTO viewPdfDTO);
//    byte[] viewSalesPdf();
}
