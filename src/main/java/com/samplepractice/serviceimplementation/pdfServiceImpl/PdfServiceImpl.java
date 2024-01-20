package com.samplepractice.serviceimplementation.pdfServiceImpl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.lowagie.text.pdf.PdfCell;
import com.samplepractice.config.CommonConstant;
import com.samplepractice.config.Constants;
import com.samplepractice.config.pdfConfig.CustomPdfPCell;
import com.samplepractice.config.pdfConfig.PdfConfig;
import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.dto.pdfdto.ViewPdfDTO;
import com.samplepractice.dto.salesorderdto.GstSummaryProductDetailsDTO;
import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;
import com.samplepractice.dto.salesorderdto.SalesOrderProductDetailsDTO;
import com.samplepractice.services.companyService.CompanyService;
import com.samplepractice.services.pdfservice.PdfService;
import com.samplepractice.validator.AppException;
import com.samplepractice.validator.CommonValidatorAppException;
import org.apache.commons.lang3.StringUtils;
import org.apache.pdfbox.io.IOUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.bouncycastle.asn1.bc.BCObjectIdentifiers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import pl.allegro.finance.tradukisto.ValueConverters;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigDecimal;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.PrivateKey;
import java.text.NumberFormat;
import java.util.*;
import java.util.List;
import java.util.stream.IntStream;

import pl.allegro.finance.tradukisto.internal.languages.english.EnglishValues;

@Service
public class PdfServiceImpl implements PdfService {

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void salesPdf(SalesOrderCompanyDTO salesOrderCompanyDTO, String companyType) throws IOException, DocumentException {
        salesInvoicePdf(salesOrderCompanyDTO, companyType);
    }

    @Override
    public byte[] viewPdfByPartyAndVoucherNo(ViewPdfDTO viewPdfDTO) throws Exception {

        CommonValidatorAppException.stringsIsNullOrEmpty("Company type is not found.",viewPdfDTO.getCompanyType());
        CommonValidatorAppException.stringsIsNullOrEmpty("Company name not found.",viewPdfDTO.getCompanyName());

        String folderPath = "D:\\Vexon Pdf\\" + viewPdfDTO.getCompanyType() + "\\" + viewPdfDTO.getCompanyName();

        try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(Path.of(folderPath), "*.pdf")) {
            for (Path pdfFilePath : directoryStream) {
                String fileName = pdfFilePath.getFileName().toString();
                if (fileName.contains(viewPdfDTO.getPdfName())) {
                    return convertPdfToByteArray(pdfFilePath);
                }
            }
        }

        return null; // or handle not found case
    }

    public String sendPdfEmail(ViewPdfDTO viewPdfDTO) {
        try {

            String recipientEmail = "everaabzal@gmail.com";
            String subject = "Sales Invoice - Invoice No. " + viewPdfDTO.getVoucherNo();
            String message = createMailMessageFormat(viewPdfDTO);
            String folderPath = "D:\\Vexon Pdf\\" + viewPdfDTO.getCompanyType() + "\\" + viewPdfDTO.getCompanyName() + "\\" + viewPdfDTO.getPdfName() + ".pdf";
            Path pdfPath = Paths.get(folderPath);

            byte[] pdfBytes = Files.readAllBytes(pdfPath);

            // Set up MimeMessage
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(message, true);

            // Attach PDF file
            ByteArrayResource pdfAttachment = new ByteArrayResource(pdfBytes);
//            helper.addAttachment("document.pdf", pdfAttachment);
            helper.addAttachment(viewPdfDTO.getCompanyName() + ".pdf", pdfAttachment);

            // Send the email
            try {
                javaMailSender.send(mimeMessage);
            } catch (Exception e) {
                e.printStackTrace();
                return "Failed to send mail. Please try again.";
            }
        } catch (IOException | MessagingException e) {
            e.printStackTrace();
            return "Failed to send mail. Please try again.";
            // Handle exceptions appropriately
        }
        return "Mail successfully sent.";
    }

    private byte[] convertPdfToByteArray(Path pdfFilePath) throws IOException {
        try (InputStream inputStream = Files.newInputStream(pdfFilePath)) {
            return IOUtils.toByteArray(inputStream);
        }
    }

    public String createMailMessageFormat(ViewPdfDTO viewPdfDTO) {
        String companyName = viewPdfDTO.getCompanyName();
        String invoiceNo = viewPdfDTO.getVoucherNo();
        String todayDate = viewPdfDTO.getOrderDateString();
        double amount = viewPdfDTO.getTotalTaxableAmount();

        String message = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<p>Dear " + companyName + ",</p>"
                + "<p>We hope this email finds you well. Attached herewith is the sales invoice for your recent purchase with us.</p>"
                + "<h3>Invoice Details:</h3>"
                + "<ul>"
                + "<li>Invoice Number: " + invoiceNo + "</li>"
                + "<li>Date: " + todayDate + "</li>"
                + "<li>Amount: INR " + amount + "</li>"
                + "</ul>"
                + "<p>Please review the details, and if you have any questions or require further assistance, feel free to reach out to us.</p>"
                + "<p>Your continued support is greatly appreciated.</p>"
                + "<p>Thank you for choosing WEL-CON CONTROL & SWITCHGEAR. We look forward to serving you again in the future.</p>"
                + "<p>Best Regards,<br/>WEL-CON CONTROL & SWITCHGEAR</p>"
                + "</body>"
                + "</html>";

        return message;
    }

    public void salesInvoicePdf(SalesOrderCompanyDTO salesOrderCompanyDTO, String companyType) {

        try {

            int l_m = 30;
            int t_m = 30;
            int inside_w = 600;
            float inside_h = 800;

            CompanyMasterDTO companyMasterDTO = companyService.getCompanyDetailsByCompanyName(salesOrderCompanyDTO.getCompanyName());

            Font font = PdfConfig.PdfFont(9f);

//            below code for get height of buyers information
            float companyInfoTablegetHeight = createCompanyInfoTableforgetHeight(salesOrderCompanyDTO, companyMasterDTO, font);
            List<GstSummaryProductDetailsDTO> summaryProductDetailsDTOS = new ArrayList<>();

            try {
                summaryProductDetailsDTOS = PdfConfig.sameHSNCodeforCalculatePrices(salesOrderCompanyDTO);
//                salesOrderProductDetailsDTOList = salesOrderCompanyDTO.getSalesOrderProductDetailsDTOList();
            } catch (Exception e) {
                System.out.println("error is product details : " + e);
            }

            System.out.println("ch : " + companyInfoTablegetHeight);
            float new_inside_h = inside_h + (companyInfoTablegetHeight - 90);
            System.out.println("nh : " + new_inside_h);
            inside_h = new_inside_h == inside_h ? inside_h : new_inside_h + 0.0f;

            int summaryAmountSize = summaryProductDetailsDTOS.size();
            if (summaryAmountSize > 1) {
                inside_h = inside_h + (10.1f * (summaryAmountSize - 1));
            }

//            int sizeOfProductData = salesOrderCompanyDTO.getSalesOrderProductDetailsDTOList().size();
//            if(sizeOfProductData>1){
//                inside_h=inside_h+(13*(sizeOfProductData-1));
//            }
//            end buyers info

            Document document = new Document(new com.itextpdf.text.Rectangle(inside_w, inside_h), 0, 0, 0, 0);

            String new_company_folder_path;
            if (companyType.equalsIgnoreCase("Customer")) {
                new_company_folder_path = "D:\\Vexon Pdf\\Sales Pdf\\" + salesOrderCompanyDTO.getCompanyName();
            } else {
                new_company_folder_path = "D:\\Vexon Pdf\\Purchase pdf\\" + salesOrderCompanyDTO.getCompanyName();
            }

            File directory = new File(new_company_folder_path);

            if (!directory.exists()) {
                directory.mkdir();
            }

            String o_file_name = new_company_folder_path + "\\" + salesOrderCompanyDTO.getVoucherNo() + " - " + salesOrderCompanyDTO.getCompanyName() + ".pdf";
            PdfWriter pdf = PdfWriter.getInstance(document, new FileOutputStream(o_file_name));
            document.open();

            com.itextpdf.text.Font b_h_font = FontFactory.getFont(FontFactory.TIMES, 11f, com.itextpdf.text.Font.BOLD);
//            document.top(-30);

            Font company_name_font = PdfConfig.PdfFont(10f);

            Font invoice = PdfConfig.PdfFont(15f);
            Font copyFont = PdfConfig.PdfFont(9f);

            float cell_size1[] = {6f, 4f};
            PdfPTable textInvoiceTable = new PdfPTable(cell_size1);
            textInvoiceTable.setWidthPercentage(90f);

            textInvoiceTable.addCell(CustomPdfPCell.CustomCell("TAX INVOICE", invoice, Element.ALIGN_RIGHT, 4f));
            textInvoiceTable.addCell(CustomPdfPCell.CustomCell("Orignal Copy", copyFont, Element.ALIGN_RIGHT, 0f, 2f));

            document.add(textInvoiceTable);

            // Add a colored rectangle
            PdfContentByte canvas = pdf.getDirectContent();

            canvas.saveState();
            canvas.setColorStroke(BaseColor.BLACK);
            canvas.rectangle(l_m, t_m, (inside_w - (l_m * 2)), (inside_h - (t_m * 2)));
            canvas.stroke();
            canvas.restoreState();

            // Create Font instances using PdfConfig.PdfFont

//            SalesOrderCompanyDTO salesOrderCompanyDTO1 = new SalesOrderCompanyDTO();
//            salesOrderCompanyDTO1=salesOrderCompanyDTO;

            createCompanyInfoTable(document, salesOrderCompanyDTO, companyMasterDTO, font, company_name_font);

            System.out.println("document height : " + document.getPageSize().getHeight());

//          ------Product Details Header-----
            Font productHeaderFont = PdfConfig.PdfFont(11f);

            float[] cell_size = {1.0f, 13.0f, 3.5f, 2.5f, 3f, 2f, 4f};
            String[] columnHeadings = {"S.No", "Decription of\nGoods", "HNS/SAC", "Quntity", "Rate", "Per", "Amount"};

            PdfPTable productHeaderTable = new PdfPTable(cell_size);
            productHeaderTable.setWidthPercentage(90);

            for (String heading : columnHeadings) {
                Paragraph paragraph = new Paragraph(heading, productHeaderFont);
                paragraph.setAlignment(Element.ALIGN_CENTER);
                PdfPCell cell = new PdfPCell();
                cell.setPaddingTop(-5f);
                if (heading.equals("S.No") || heading.equals("Decription of\nGoods")) {
                    paragraph.setMultipliedLeading(1f);
                    cell.setPaddingTop(-1f);
                } else {
                    cell.setPaddingTop(-5f);
                }
                cell.addElement(paragraph);
                productHeaderTable.addCell(cell);
            }

            document.add(productHeaderTable);
//            ------end product details header------

            document.add(createProductDetailsTable(salesOrderCompanyDTO, cell_size));

            document.add(createProductDetailsFotterTable(salesOrderCompanyDTO, cell_size));

            PdfPTable wordAmountTable = new PdfPTable(1);
            wordAmountTable.setWidthPercentage(90f);
            long totalTaxableAmount = Math.round(salesOrderCompanyDTO.getTotalTaxableAmount());
            String wordAmountText = "Amount Chargeable (in word)\n" + IndianNumberToWordsConverter.convertToWords(String.valueOf(totalTaxableAmount));
            Paragraph wordAmountParagraph = new Paragraph(wordAmountText, b_h_font);
            wordAmountParagraph.setFont(copyFont);
            PdfPCell wordAmountCell = new PdfPCell();
            wordAmountCell.addElement(wordAmountParagraph);
            wordAmountTable.addCell(wordAmountCell);
            document.add(wordAmountTable);

            createGetSummrayAmount(font, document, salesOrderCompanyDTO, summaryProductDetailsDTOS);

            PdfPTable wordFinalAmountTable = new PdfPTable(1);
            wordFinalAmountTable.setWidthPercentage(90f);
            NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("en", "in"));
            int decimalValue = CommonConstant.DecimalValueExtractor(salesOrderCompanyDTO.getTotalTaxableAmount());

            String wordFinalAmountText = "Tax Amount (in word) " + IndianNumberToWordsConverter.convertToWords(String.valueOf(CommonConstant.formatDecimal((float) salesOrderCompanyDTO.getTotalTaxAmount())));
            Paragraph wordFinalAmountParagraph = new Paragraph(wordFinalAmountText, b_h_font);
            wordFinalAmountParagraph.setFont(copyFont);
            PdfPCell wordFinalAmountCell = new PdfPCell();
            wordFinalAmountCell.addElement(wordFinalAmountParagraph);
            wordFinalAmountCell.setBorder(0);
            wordFinalAmountTable.addCell(wordFinalAmountCell);
            document.add(wordFinalAmountTable);

            document.add(createCompanyBankDetailsTable(font));
//            Document document = new Document(new com.itextpdf.text.Rectangle(inside_w, inside_h), 0, 0, 0, 0);
//            document.setPageSize(new com.itextpdf.text.Rectangle(inside_w, document.getPageSize().getHeight()));
//            document.top(-30);
            // Close the document
            document.close();
            pdf.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static float createCompanyInfoTable(Document document, SalesOrderCompanyDTO salesOrderCompanyDTO, CompanyMasterDTO companyMasterDTO, Font font, Font companyNameFont) {
        PdfPTable ownCompanyTable = new PdfPTable(4);
        ownCompanyTable.setWidthPercentage(90);

        PdfPTable buyerCompanyTable = new PdfPTable(4);
        buyerCompanyTable.setWidthPercentage(90);

        Map<String, String> companyInfoTexts = new LinkedHashMap<>();
        companyInfoTexts.put("companyName", "WEL-CON CONTROL & SWITCHGEAR");
        companyInfoTexts.put("address", "SHOP NO.3 GREEN PARK SOCIETY, RAJOSANA, TA \n VADGAM, Banaskantha, Gujarat, 385520");
        companyInfoTexts.put("phoneNo", "M  :  +919558573291");
        companyInfoTexts.put("urnNo", "URN NO  :  ");
        companyInfoTexts.put("GstIn", "GSTIN/UIN  :  24ACMPE7639K1Z9");
        companyInfoTexts.put("stateName", "State Name  :  GUJARAT");
        companyInfoTexts.put("email", "Email  :  ");

        // Create a cell for company information
        ownCompanyTable.addCell(createInfoCell(companyInfoTexts, font, 3));

//        invoice no,date and another static information
        Map<String, String> invoiceInfoTexts = new LinkedHashMap<>();
        invoiceInfoTexts.put("invoiceNo", "Invoice No. \n" + salesOrderCompanyDTO.getVoucherNo());
        invoiceInfoTexts.put("dated", "Dated \n" + CommonConstant.formatDate(salesOrderCompanyDTO.getOrderDate()));
        invoiceInfoTexts.put("deliveryNote", "Delivery Note \n ");
        invoiceInfoTexts.put("modeOfPayment", "Mode Term Of Payment \n");
        invoiceInfoTexts.put("supplierRef", "Supplier-Ref ");
        invoiceInfoTexts.put("otherReferences", "Other Reference(s) ");

        try {
            document.add(createInvoiceInfoCell("companyInfo", invoiceInfoTexts, ownCompanyTable, font));
        } catch (Exception e) {
            e.printStackTrace();
        }

//        get companyDetails by companyName

//        buyers information
        String buyerAddress = companyMasterDTO.getAddress();
        System.out.println(buyerAddress.length());
        Map<String, String> buyerInfo = new LinkedHashMap<>();
        buyerInfo.put("Buyer's", "Buyer's");
        buyerInfo.put("buyerCompanyName", companyMasterDTO.getCompanyName());
        buyerInfo.put("buyerAddress", buyerAddress);
        buyerInfo.put("gstin", "GSTIN/UIN : " + companyMasterDTO.getCompanyGstNo());
        buyerInfo.put("stateName", "State Name : " + companyMasterDTO.getStateName());
        buyerInfo.put("placeOfSupply", "Place of Supplay : " + companyMasterDTO.getStateName());
        buyerInfo.put("contactPerson", "Contact Person :");
        String phoneNo = (companyMasterDTO.getPhoneNo()==null || companyMasterDTO.getPhoneNo().isEmpty()) ? "" : companyMasterDTO.getPhoneNo() ;
        buyerInfo.put("contact", "Contact : " + phoneNo);

        buyerCompanyTable.addCell(createInfoCell(buyerInfo, font, 5));

//        static information of transfer product
        Map<String, String> buyerInfoStatic = new LinkedHashMap<>();
        buyerInfoStatic.put("byersOrderNo", "Byer's Order No. ");
        buyerInfoStatic.put("Dated", "Dated ");
        buyerInfoStatic.put("Despatch Document No", "Despatch Document No ");
        buyerInfoStatic.put("Delivery Note Date.", "Delivery Note Date. ");
        buyerInfoStatic.put("Despatched throught", "Despatched throught ");
        buyerInfoStatic.put("Destination", "Destination ");
        buyerInfoStatic.put("Bill of Lidding/LR-RR No.", "Bill of Lidding/LR-RR No. ");
        buyerInfoStatic.put("Motor Vahical No.", "Motor Vahical No. ");
        buyerInfoStatic.put("termOfDelivery", "Term of Delivery. \n\n");

        PdfPTable buyerInfo1 = null;
        float tableHeight = 0;

        try {
            buyerInfo1 = createInvoiceInfoCell("buyerInfo", buyerInfoStatic, buyerCompanyTable, font);
            document.add(buyerInfo1);
            tableHeight = buyerInfo1.getTotalHeight();
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("Table height: " + tableHeight);

        return tableHeight;
    }

    public static float createCompanyInfoTableforgetHeight(SalesOrderCompanyDTO salesOrderCompanyDTO, CompanyMasterDTO companyMasterDTO, Font font) throws FileNotFoundException, DocumentException {

        Document document = new Document();
        document.setMargins(0, 0, 0, 0);

        document.setPageSize(new Rectangle(600, 800));

        String pdf_name = "sample_report";
        String o_file_name = "D:\\sales pdf\\" + pdf_name + ".pdf";
        PdfWriter pdf = PdfWriter.getInstance(document, new FileOutputStream(o_file_name));
        document.open();

//        Font font = PdfConfig.PdfFont(9f);
        Font company_name_font = PdfConfig.PdfFont(10f);


        PdfPTable buyerCompanyTable = new PdfPTable(4);
        buyerCompanyTable.setWidthPercentage(90);

//        get companyDetails by companyName

//        buyers information
        String buyerAddress = companyMasterDTO.getAddress();
        System.out.println(buyerAddress.length());
        Map<String, String> buyerInfo = new LinkedHashMap<>();
        buyerInfo.put("Buyer's", "Buyer's");
        buyerInfo.put("buyerCompanyName", companyMasterDTO.getCompanyName());
        buyerInfo.put("buyerAddress", buyerAddress);
        buyerInfo.put("gstin", "GSTIN/UIN : " + companyMasterDTO.getCompanyGstNo());
        buyerInfo.put("stateName", "State Name : " + companyMasterDTO.getStateName());
        buyerInfo.put("placeOfSupply", "Place of Supplay : " + companyMasterDTO.getStateName());
        buyerInfo.put("contactPerson", "Contact Person :");
        buyerInfo.put("contact", "Contact : " + companyMasterDTO.getPhoneNo());

        buyerCompanyTable.addCell(createInfoCell(buyerInfo, font, 5));

//        static information of transfer product
        Map<String, String> buyerInfoStatic = new LinkedHashMap<>();
        buyerInfoStatic.put("byersOrderNo", "Byer's Order No. ");
        buyerInfoStatic.put("Dated", "Dated ");
        buyerInfoStatic.put("Despatch Document No", "Despatch Document No ");
        buyerInfoStatic.put("Delivery Note Date.", "Delivery Note Date. ");
        buyerInfoStatic.put("Despatched throught", "Despatched throught ");
        buyerInfoStatic.put("Destination", "Destination ");
        buyerInfoStatic.put("Bill of Lidding/LR-RR No.", "Bill of Lidding/LR-RR No. ");
        buyerInfoStatic.put("Motor Vahical No.", "Motor Vahical No. ");
        buyerInfoStatic.put("termOfDelivery", "Term of Delivery. \n\n");

        float tableHeight = 0;

        try {
            PdfPTable buyerInfo1 = createInvoiceInfoCell("buyerInfo", buyerInfoStatic, buyerCompanyTable, font);
            document.add(buyerInfo1);

            tableHeight = buyerInfo1.getTotalHeight();

        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("Table height: " + tableHeight);

        return tableHeight;
    }

    private static PdfPCell createInfoCell(Map<String, String> infoTexts, Font font, int rowspan) {
        PdfPCell cell = new PdfPCell();
        cell.setColspan(2);
        cell.setPaddingTop(-5f);
        cell.setPaddingBottom(5f);
        cell.setRowspan(rowspan);
        cell.setMinimumHeight(rowspan == 5 ? 90f : 99f);

        for (Map.Entry<String, String> infoText : infoTexts.entrySet()) {
            Paragraph paragraph = new Paragraph(infoText.getValue(), font);
            paragraph.setSpacingAfter(-5f);

            if (infoText.getKey().equals("companyName")) {
                paragraph.setFirstLineIndent(0f);
                paragraph.setSpacingAfter(-3f);
            } else if (infoText.getKey().equals("address")) {
                paragraph.setSpacingBefore(2f);
                paragraph.setMultipliedLeading(1f);
                paragraph.setSpacingAfter(-5f);
            } else if (infoText.getKey().equals("buyerAddress")) {
                paragraph.setSpacingBefore(2f);
                paragraph.setMultipliedLeading(1f);
                paragraph.setSpacingAfter(-2f);
            } else if (infoText.getKey().equals("buyerCompanyName")) {
                paragraph.setSpacingAfter(0f);
            }
            cell.addElement(paragraph);
        }
        return cell;
    }

    private static PdfPTable createInvoiceInfoCell(String typeInfo, Map<String, String> infoTexts, PdfPTable table, Font font) {

        for (Map.Entry<String, String> infoText : infoTexts.entrySet()) {
            PdfPCell invoiceInfoCell = new PdfPCell();
            Paragraph paragraph = new Paragraph(infoText.getValue(), font);
            invoiceInfoCell.setPaddingTop(-5f);
            if (typeInfo.equals("companyInfo")) {
                invoiceInfoCell.setMinimumHeight(33f);
            }
            if (infoText.getKey().equals("termOfDelivery")) {
                invoiceInfoCell.setColspan(2);
            }
            if (infoText.getKey().equals("invoiceNo") || infoText.getKey().equals("byersOrderNo")) {
                invoiceInfoCell.isUseAscender();
            }
            invoiceInfoCell.addElement(paragraph);
            table.addCell(invoiceInfoCell);
        }
        return table;
    }


    public static PdfPTable createProductDetailsTable(SalesOrderCompanyDTO salesOrderCompanyDTO, float[] columnSizeOfTable) {

        PdfPTable productDetailsData = new PdfPTable(columnSizeOfTable);
        productDetailsData.setWidthPercentage(90);
        productDetailsData.setSpacingAfter(-10f);
//        float minheight[] = {334.5f, 321.5f, 308.f, 295.5f, 282.5f, 269.5f, 256.5f, 243.5f, 230.5f, 217.5f};
//        float minHeight = minheight[salesOrderCompanyDTO.getSalesOrderProductDetailsDTOList().size() - 1];
        float minHeight = 334.5f;
        float minHeightTotal = 20f;

        StringBuilder SNoData = new StringBuilder();
        StringBuilder productNameData = new StringBuilder();
        StringBuilder productTypeData = new StringBuilder();
        StringBuilder quantityData = new StringBuilder();
        StringBuilder priceData = new StringBuilder();
        StringBuilder totalData = new StringBuilder();
        StringBuilder hsnCodeData = new StringBuilder();

        SNoData.append("\n");
        productNameData.append("\n");
        productTypeData.append("\n");
        quantityData.append("\n");
        priceData.append("\n");
        totalData.append("\n");
        hsnCodeData.append("\n");

        for (int i = 0; i < salesOrderCompanyDTO.getSalesOrderProductDetailsDTOList().size(); i++) {

            SalesOrderProductDetailsDTO dto = salesOrderCompanyDTO.getSalesOrderProductDetailsDTOList().get(i);

            SNoData.append(i + 1).append("\n");
            productNameData.append(dto.getProductName()).append("\n");
            productTypeData.append(dto.getProductType()).append("\n");
            quantityData.append(String.format("%.2f", dto.getQuantity())).append("\n");
            priceData.append(String.format("%.2f", dto.getPrice())).append("\n");
            totalData.append(String.format("%.2f", dto.getTotal())).append("\n");
            hsnCodeData.append(dto.getHsnCode()).append("\n");
        }

        if (salesOrderCompanyDTO.getGstType().equals(Constants.IGST18)) {
            productNameData.append("\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tIntegrated Tax\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tROUND OFF");
            totalData.append("\n\n").append(String.format("%.2f", salesOrderCompanyDTO.getTotalTaxAmount()));
            totalData.append("\n").append(CommonConstant.extractDecimalPart(salesOrderCompanyDTO.getTotalTaxableAmount()));
        } else if (salesOrderCompanyDTO.getGstType().equals(Constants.LGST18)) {
            productNameData.append("\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCGST\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSGST\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tROUND OFF");
            totalData.append("\n\n").append(String.format("%.2f", salesOrderCompanyDTO.getTotalTaxAmount() / 2));
            totalData.append("\n").append(String.format("%.2f", salesOrderCompanyDTO.getTotalTaxAmount() / 2));
            totalData.append("\n").append(CommonConstant.extractDecimalPart(salesOrderCompanyDTO.getTotalTaxableAmount()));
        }

        productDetailsData.addCell(PdfConfig.createCell("" + SNoData.toString(), Element.ALIGN_CENTER, minHeight, "detailsBody"));
        productDetailsData.addCell(PdfConfig.createCell("" + productNameData.toString(), Element.ALIGN_LEFT, minHeight, "detailsBody"));
        productDetailsData.addCell(PdfConfig.createCell("" + hsnCodeData.toString(), Element.ALIGN_CENTER, minHeight, "detailsBody"));
        productDetailsData.addCell(PdfConfig.createCell("" + quantityData.toString(), Element.ALIGN_RIGHT, minHeight, "detailsBody"));
        productDetailsData.addCell(PdfConfig.createCell("" + priceData.toString(), Element.ALIGN_RIGHT, minHeight, "detailsBody"));
        productDetailsData.addCell(PdfConfig.createCell("" + productTypeData.toString(), Element.ALIGN_CENTER, minHeight, "detailsBody"));
        productDetailsData.addCell(PdfConfig.createCell("" + totalData.toString(), Element.ALIGN_RIGHT, minHeight, "detailsBody"));

        productNameData.setLength(0);

        return productDetailsData;
    }

    public static PdfPTable createProductDetailsFotterTable(SalesOrderCompanyDTO salesOrderCompanyDTO, float[] columnSizeOfTable) {

        PdfPTable productDetailsData = new PdfPTable(columnSizeOfTable);
        productDetailsData.setWidthPercentage(90);
        productDetailsData.setSpacingBefore(10f);
        float minHeight = 0f;

        productDetailsData.addCell(PdfConfig.createCell("", Element.ALIGN_RIGHT, minHeight, "detailsFotter"));
        productDetailsData.addCell(PdfConfig.createCell("Total", Element.ALIGN_RIGHT, minHeight, "detailsFotter"));
        productDetailsData.addCell(PdfConfig.createCell("", Element.ALIGN_RIGHT, minHeight, "detailsFotter"));
        productDetailsData.addCell(PdfConfig.createCell("" + String.format("%.2f", salesOrderCompanyDTO.getSalesOrderProductDetailsDTOList().stream().mapToDouble(SalesOrderProductDetailsDTO::getQuantity).sum()), Element.ALIGN_RIGHT, minHeight, "detailsFotter"));
        productDetailsData.addCell(PdfConfig.createCell("", Element.ALIGN_RIGHT, minHeight, "detailsFotter"));
        productDetailsData.addCell(PdfConfig.createCell("", Element.ALIGN_RIGHT, minHeight, "detailsFotter"));
        productDetailsData.addCell(PdfConfig.createCell("" + CommonConstant.extractRoundOrFloorValue(salesOrderCompanyDTO.getTotalTaxableAmount()), Element.ALIGN_RIGHT, minHeight, "detailsFotter"));

        return productDetailsData;
    }

    public static PdfPTable createGetSummrayAmount(Font font, Document document, SalesOrderCompanyDTO salesOrderCompanyDTO, List<GstSummaryProductDetailsDTO> summaryProductDetailsDTOS) {
//        PdfPTable gst_summary_table = null;
        NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("en", "in"));

        String gstType = salesOrderCompanyDTO.getGstType();

        int columns = gstType.startsWith("LGST") ? 9 : (gstType.startsWith("IGST") ? 7 : 0);

        if (columns == 0) {
            throw new AppException("Invalid GST type: " + gstType);
        }

        PdfPTable gstSummaryTable = new PdfPTable(columns);
        gstSummaryTable.setWidthPercentage(90f);

        PdfPCell hsnCell = PdfConfig.createPdfPCell("HSN/SAC", font, Element.ALIGN_CENTER, -2f, 3, 2);
        PdfPCell taxableValueCell = PdfConfig.createPdfPCell("Taxable\nValue", font, Element.ALIGN_CENTER, -2f, 0, 2);

        PdfPCell tax = PdfConfig.createPdfPCell(gstType.startsWith("LGST") ? "Central Tax" : "Integrated Tax", font, Element.ALIGN_CENTER, -2f, 2);

        PdfPCell stateTax = PdfConfig.createPdfPCell("State Tax", font, Element.ALIGN_CENTER, -2f, 2);

        PdfPCell cRate = PdfConfig.createPdfPCell("Rate", font, Element.ALIGN_CENTER, -2f, 0, 0);
        PdfPCell cAmount = PdfConfig.createPdfPCell("Amount", font, Element.ALIGN_CENTER, -2f, 0, 0);

        PdfPCell sRate = PdfConfig.createPdfPCell("Rate", font, Element.ALIGN_CENTER, -2f, 0, 0);
        PdfPCell sAmount = PdfConfig.createPdfPCell("Amount", font, Element.ALIGN_CENTER, -2f, 0, 0);

        PdfPCell totalTaxAmount = PdfConfig.createPdfPCell("Total\nTax Amount", font, Element.ALIGN_CENTER, -2f, 0, 2);

        if (gstType.startsWith("LGST")) {
            PdfConfig.addCellsToTable(gstSummaryTable, hsnCell, taxableValueCell, tax, stateTax, totalTaxAmount, cRate, cAmount, sRate, sAmount);
        } else {
            hsnCell.setColspan(3);
            PdfConfig.addCellsToTable(gstSummaryTable, hsnCell, taxableValueCell, tax, totalTaxAmount, cRate, cAmount);
        }

        try {
            document.add(gstSummaryTable);
        } catch (Exception e) {
            e.printStackTrace();
        }

        PdfPTable gstSummaryAmount = null;

        if (gstType.startsWith("LGST")) {
            gstSummaryAmount = new PdfPTable(9);
        } else if (gstType.startsWith("IGST")) {
            gstSummaryAmount = new PdfPTable(7);
        }

        gstSummaryAmount.setWidthPercentage(90f);

        float gst_totals = 0;

        for (int i = 0; i < summaryProductDetailsDTOS.size(); i++) {

            GstSummaryProductDetailsDTO gstSummaryProductDetailsDTO = summaryProductDetailsDTOS.get(i);

            PdfPCell s_hsn_cell = new PdfPCell(new Paragraph(gstSummaryProductDetailsDTO.getHsnCode(), font));

            s_hsn_cell.setPaddingTop(-2f);
            s_hsn_cell.setColspan(3);
            String moneytotal = formatter.format(gstSummaryProductDetailsDTO.getTotal());
            Paragraph moneytotal_p = new Paragraph(new Paragraph(String.valueOf(moneytotal), font));
            moneytotal_p.setAlignment(Element.ALIGN_RIGHT);
            PdfPCell bill_amount = new PdfPCell();
            bill_amount.setPaddingTop(-5f);
            bill_amount.addElement(moneytotal_p);
            gstSummaryAmount.addCell(s_hsn_cell);
            gstSummaryAmount.addCell(bill_amount);

            PdfPCell c_taxt = null;
            PdfPCell s_taxt = null;

            float qun_total = (float) gstSummaryProductDetailsDTO.getTotal();

            Paragraph p1;
            float ratePercentage;

            switch (gstType) {
                case Constants.LGST12:
                    p1 = new Paragraph("6%", font);
                    ratePercentage = 6;
                    break;
                case Constants.LGST18:
                    p1 = new Paragraph("9%", font);
                    ratePercentage = 9;
                    break;
                case Constants.LGST28:
                    p1 = new Paragraph("14%", font);
                    ratePercentage = 14;
                    break;
                case Constants.IGST12:
                    p1 = new Paragraph("12%", font);
                    ratePercentage = 12;
                    break;
                case Constants.IGST18:
                    p1 = new Paragraph("18%", font);
                    ratePercentage = 18;
                    break;
                case Constants.IGST28:
                    p1 = new Paragraph("28%", font);
                    ratePercentage = 28;
                    break;
                default:
                    throw new IllegalArgumentException("Invalid GST type: " + gstType);
            }

            p1.setAlignment(Element.ALIGN_RIGHT);

//            float paddingTop = (ratePercentage == 12 || ratePercentage == 18 || ratePercentage == 28) ? -2.5f : -5f;

            float paddingTop = -5f;
            c_taxt = PdfConfig.createPdfPCellWithPadding(p1, paddingTop);
            s_taxt = PdfConfig.createPdfPCellWithPadding(p1, paddingTop);

            float totalPri = (qun_total * ratePercentage) / 100;

            Paragraph ratesP = new Paragraph(String.valueOf(formatter.format(totalPri)), font);
            ratesP.setAlignment(Element.ALIGN_RIGHT);

            PdfPCell cRates = PdfConfig.createPdfPCellWithPadding(ratesP, paddingTop);
            PdfPCell sRates = PdfConfig.createPdfPCellWithPadding(ratesP, paddingTop);

            if (gstType.contentEquals(Constants.LGST12) || gstType.contentEquals(Constants.LGST18) || gstType.contentEquals(Constants.LGST28)) {

                Paragraph rates_total_p = new Paragraph(String.valueOf(formatter.format((float) totalPri * 2)), font);
                rates_total_p.setAlignment(Element.ALIGN_RIGHT);
                PdfPCell final_rates = new PdfPCell();
                final_rates.setPaddingTop(-5f);
                final_rates.addElement(rates_total_p);

                gstSummaryAmount.addCell(c_taxt);
                gstSummaryAmount.addCell(cRates);
                gstSummaryAmount.addCell(s_taxt);
                gstSummaryAmount.addCell(sRates);
                gstSummaryAmount.addCell(final_rates);

            } else if (gstType.contentEquals(Constants.IGST12) || gstType.contentEquals(Constants.IGST18) || gstType.contentEquals(Constants.IGST28)) {

                Paragraph rates_total_p = new Paragraph(String.valueOf(formatter.format((float) totalPri)), font);
                rates_total_p.setAlignment(Element.ALIGN_RIGHT);
                PdfPCell final_rates = new PdfPCell();
                final_rates.setPaddingTop(-5f);
                final_rates.addElement(rates_total_p);

                gstSummaryAmount.addCell(c_taxt);
                gstSummaryAmount.addCell(cRates);
                gstSummaryAmount.addCell(final_rates);

            }

            if (gstType.contentEquals(Constants.LGST12) || gstType.contentEquals(Constants.LGST18) || gstType.contentEquals(Constants.LGST28)) {

                gst_totals = gst_totals + (totalPri * 2);

            } else if (gstType.contentEquals(Constants.IGST12) || gstType.contentEquals(Constants.IGST18) || gstType.contentEquals(Constants.IGST28)) {

                gst_totals = gst_totals + qun_total;

            }

            if (i == summaryProductDetailsDTOS.size() - 1) {
                Paragraph item_data_t_p = new Paragraph("Total", font);

                PdfPCell total_text = new PdfPCell();
                total_text.setPaddingTop(-5f);
                total_text.addElement(item_data_t_p);

//                double totalTaxableValue = salesOrderProductDetailsDTOList.stream().mapToDouble(SalesOrderProductDetailsDTO::getTotal).sum();

                double totalTaxableValue = salesOrderCompanyDTO.getTotalAmount();

                float c_gst1 = (float) (totalTaxableValue * 9) / 100;
                float s_gst1 = (float) (totalTaxableValue * 9) / 100;

                Paragraph totala1_p = new Paragraph(String.valueOf(formatter.format((float) totalTaxableValue)), font);
                totala1_p.setAlignment(Element.ALIGN_RIGHT);
                PdfPCell totala1_cell = new PdfPCell();
                totala1_cell.setPaddingTop(-5f);
                totala1_cell.addElement(totala1_p);

                Paragraph c_gst1_p = new Paragraph(String.valueOf(formatter.format(c_gst1)), font);
                c_gst1_p.setAlignment(Element.ALIGN_RIGHT);
                PdfPCell c_gst1_cell = new PdfPCell();
                c_gst1_cell.setPaddingTop(-5f);
                c_gst1_cell.addElement(c_gst1_p);

                Paragraph s_gst1_p = new Paragraph(String.valueOf(formatter.format(s_gst1)), font);
                s_gst1_p.setAlignment(Element.ALIGN_RIGHT);
                PdfPCell s_gst1_cell = new PdfPCell();
                s_gst1_cell.setPaddingTop(-5f);
                s_gst1_cell.addElement(s_gst1_p);

                Paragraph gst_totals_p = new Paragraph(String.valueOf(formatter.format(salesOrderCompanyDTO.getTotalTaxAmount())), font);
                gst_totals_p.setAlignment(Element.ALIGN_RIGHT);
                PdfPCell gst_totals_cell = new PdfPCell();
                gst_totals_cell.setPaddingTop(-5f);
                gst_totals_cell.addElement(gst_totals_p);

                if (gstType.contentEquals(Constants.LGST12) || gstType.contentEquals(Constants.LGST18) || gstType.contentEquals(Constants.LGST28)) {

                    total_text.setColspan(3);
                    gstSummaryAmount.addCell(total_text);
                    PdfPCell c_taxt_total = new PdfPCell(new Paragraph("", font));
                    PdfPCell s_taxt_total = new PdfPCell(new Paragraph("", font));

                    gstSummaryAmount.addCell(totala1_cell);
                    gstSummaryAmount.addCell(c_taxt_total);
                    gstSummaryAmount.addCell(c_gst1_cell);
                    gstSummaryAmount.addCell(s_taxt_total);
                    gstSummaryAmount.addCell(s_gst1_cell);
                    gstSummaryAmount.addCell(gst_totals_cell);

                } else if (gstType.contentEquals(Constants.IGST12) || gstType.contentEquals(Constants.IGST18) || gstType.contentEquals(Constants.IGST28)) {

                    total_text.setColspan(3);
                    gstSummaryAmount.addCell(total_text);
                    PdfPCell c_taxt_total = new PdfPCell(new Paragraph("", font));

                    gstSummaryAmount.addCell(totala1_cell);
                    gstSummaryAmount.addCell(c_taxt_total);

                    Paragraph c_gst1_sgst1_p = new Paragraph(String.valueOf(formatter.format(c_gst1 + s_gst1)), font);
                    c_gst1_sgst1_p.setAlignment(Element.ALIGN_RIGHT);
                    PdfPCell c_gst1_sgst1_cell = new PdfPCell();
                    c_gst1_sgst1_cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    c_gst1_sgst1_cell.setPaddingTop(-5f);
                    c_gst1_sgst1_cell.addElement(c_gst1_sgst1_p);

                    gstSummaryAmount.addCell(gst_totals_cell);
                    gstSummaryAmount.addCell(gst_totals_cell);

                }
            }
        }
        try {
            document.add(gstSummaryAmount);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return gstSummaryTable;
    }

    public static PdfPTable createCompanyBankDetailsTable(Font font) {
        com.itextpdf.text.Font bankdetail_font = FontFactory.getFont(FontFactory.TIMES, 10f, com.itextpdf.text.Font.UNDERLINE);
        com.itextpdf.text.Font b_h_font = FontFactory.getFont(FontFactory.TIMES, 11f, com.itextpdf.text.Font.BOLD);

        // Create a PDF table with 2 columns
        PdfPTable companyDetails = new PdfPTable(2);
        companyDetails.setWidthPercentage(90f);

//      Create cells for the first column
        PdfPCell cell1 = new PdfPCell();
        cell1.setRowspan(2);
        cell1.setVerticalAlignment(Element.ALIGN_BOTTOM);
        cell1.setBorder(Rectangle.NO_BORDER);

//      Add content to the first cell
        Paragraph declaration = new Paragraph("Company's PAN   :   ", font);
        declaration.setSpacingAfter(-2f);
        cell1.addElement(declaration);

        declaration = new Paragraph("Declaration", bankdetail_font);
        cell1.addElement(declaration);

        declaration = new Paragraph("We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct", font);
        declaration.setMultipliedLeading(1f);
        cell1.addElement(new Paragraph(declaration));

//      Create cells for the second column
        PdfPCell cell21 = new PdfPCell();
        cell21.setHorizontalAlignment(Element.ALIGN_BOTTOM);
        cell21.setBorder(Rectangle.NO_BORDER);

//      Add content to the second cell
        Paragraph companyDetailsParagraph = new Paragraph("Company Bank Details", font);
        companyDetailsParagraph.setSpacingAfter(-4f);
        cell21.addElement(companyDetailsParagraph);

        String[] bankDetails = {
                "Bank Name                 :  HDFC BANK",
                "A/C No                        :  50200062361821",
                "Branch & IFC Code  :  CHHAPI & HDFC0003086",
                "..."
        };

        for (String detail : bankDetails) {
            Paragraph co_details = new Paragraph(detail, font);
            co_details.setSpacingAfter(-4f);
            cell21.addElement(co_details);
        }

        PdfPCell cell22 = new PdfPCell();
        cell22.setPaddingTop(-5f);

//      Add content to the third cell
        Paragraph authorizedSignatory = new Paragraph("for WEL-CON CONTROL & SWITCHGEAR", b_h_font);
        authorizedSignatory.setAlignment(Element.ALIGN_RIGHT);
        cell22.addElement(authorizedSignatory);

        authorizedSignatory = new Paragraph("Authorised Signatory", font);
        authorizedSignatory.setSpacingBefore(13f);
        authorizedSignatory.setAlignment(Element.ALIGN_RIGHT);
        cell22.addElement(authorizedSignatory);

//      Add cells to the table
        companyDetails.addCell(cell1);
        companyDetails.addCell(cell21);
        companyDetails.addCell(cell22);

//      Add the table to the document
        return companyDetails;
    }

}
