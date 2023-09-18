package com.samplepractice.services.pdfservice;

import com.itextpdf.text.DocumentException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface PdfService {

    void salesPdf(HttpServletResponse response) throws DocumentException, IOException;

}
