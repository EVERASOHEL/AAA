package com.samplepractice.serviceimplementation.pdfServiceImpl;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.lowagie.text.pdf.PdfCell;
import com.samplepractice.config.CommonConstant;
import com.samplepractice.config.pdfConfig.CustomPdfPCell;
import com.samplepractice.config.pdfConfig.PdfConfig;
import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;
import com.samplepractice.dto.salesorderdto.SalesOrderProductDetailsDTO;
import com.samplepractice.services.pdfservice.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import pl.allegro.finance.tradukisto.ValueConverters;

import javax.servlet.http.HttpServletResponse;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.List;

import pl.allegro.finance.tradukisto.internal.languages.english.EnglishValues;

@Service
public class PdfServiceImpl implements PdfService {

    @Autowired
    private TemplateEngine templateEngine;

    @Override
    public void salesPdf(HttpServletResponse response) throws IOException, DocumentException {
        salesInvoicePdf();
    }

    public void salesInvoicePdf() {

        try {
            int l_m = 30;
            int t_m = 30;
            int inside_w = 600;
            int inside_h = 726;

            Document document = new Document(new com.itextpdf.text.Rectangle(inside_w, inside_h), 0, 0, 0, 0);

            document.top(-30);

            String pdf_name = "sales_report";
            String o_file_name = "D:\\sales pdf\\" + pdf_name + ".pdf";
            PdfWriter pdf = PdfWriter.getInstance(document, new FileOutputStream(o_file_name));
            document.open();

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

            SalesOrderCompanyDTO salesOrderCompanyDTO = new SalesOrderCompanyDTO();
            salesOrderCompanyDTO.setCompanyName("");
            salesOrderCompanyDTO.setVoucherNo("");
            salesOrderCompanyDTO.setOrderDate(new Date());
            salesOrderCompanyDTO.setTotalAmount(245f);
            salesOrderCompanyDTO.setTotalTaxAmount(450f);
            salesOrderCompanyDTO.setTotalTaxableAmount(1250.75f);
            salesOrderCompanyDTO.setGstType("IGST18[18%]");

            // Create Font instances using PdfConfig.PdfFont
            Font font = PdfConfig.PdfFont(9f);
            Font company_name_font = PdfConfig.PdfFont(10f);

            createCompanyInfoTable(document, font, company_name_font, "INV-2023001");

//          ------Product Details Header-----
            Font productHeaderFont = PdfConfig.PdfFont(11f);

            float[] cell_size = {1.0f, 13.0f, 3.0f, 3f, 3f, 2f, 4f};
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

            List<SalesOrderProductDetailsDTO> listOfProductData = new ArrayList<>();
            SalesOrderProductDetailsDTO productDetailsDTO = new SalesOrderProductDetailsDTO();

            productDetailsDTO.setProductName("Contactor");
            productDetailsDTO.setHsnCode("AFDTHJ8JD9J");
            productDetailsDTO.setPrice(420f);
            productDetailsDTO.setQuantity(2f);
            productDetailsDTO.setProductType("PCS");
            productDetailsDTO.setTotal(840f);

            SalesOrderProductDetailsDTO productDetailsDTO1 = new SalesOrderProductDetailsDTO();

            productDetailsDTO1.setProductName("MCB");
            productDetailsDTO1.setHsnCode("JKDG8LDSK");
            productDetailsDTO1.setPrice(120f);
            productDetailsDTO1.setQuantity(2f);
            productDetailsDTO1.setProductType("PCS");
            productDetailsDTO1.setTotal(240f);

            listOfProductData.add(productDetailsDTO1);
            listOfProductData.add(productDetailsDTO);

//            list of productdata add
            document.add(createProductDetailsTable(salesOrderCompanyDTO, listOfProductData, cell_size));

            document.add(createProductDetailsFotterTable(salesOrderCompanyDTO, listOfProductData, cell_size));

            PdfPTable word_amount=new PdfPTable(1);
            word_amount.setWidthPercentage(90f);

            PdfPCell wordcell=new PdfPCell();
//            wordcell.setPaddingTop(-5f);
            long totalTaxableAmount = Math.round(salesOrderCompanyDTO.getTotalTaxableAmount());
//            String words = IndianNumberToWordsConverter.convertToWords(totalTaxableAmount);
            Paragraph word_amount_p=new Paragraph("Amount Chargeable (in word)\n"+IndianNumberToWordsConverter.convertToWords(String.valueOf(totalTaxableAmount)));
            word_amount_p.setFont(copyFont);

            wordcell.addElement(word_amount_p);
            word_amount.addCell(wordcell);

            document.add(word_amount);
            // Close the document
            document.close();
            pdf.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void createCompanyInfoTable(Document document, Font font, Font companyNameFont, String v_no) {
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
        invoiceInfoTexts.put("invoiceNo", "Invoice No. \n" + v_no);
        invoiceInfoTexts.put("dated", "Dated \n" + new Date());
        invoiceInfoTexts.put("deliveryNote", "Delivery Note \n ");
        invoiceInfoTexts.put("modeOfPayment", "Mode Term Of Payment \n");
        invoiceInfoTexts.put("supplierRef", "Supplier-Ref ");
        invoiceInfoTexts.put("otherReferences", "Other Reference(s) ");

        try {
            document.add(createInvoiceInfoCell("companyInfo", invoiceInfoTexts, ownCompanyTable, font));
        } catch (Exception e) {
            e.printStackTrace();
        }

//        buyers information
        Map<String, String> buyerInfo = new LinkedHashMap<>();
        buyerInfo.put("Buyer's", "Buyer's");
        buyerInfo.put("buyerCompanyName", "Shree Jee Electricals");
        buyerInfo.put("buyerAddress", "C-27 , Pratap Nagar, Udaipur Rajasthan-313001 C-27 , Pratap Nagar, Udaipur Rajasthan-313001 C-27 , Pratap Nagar, Udaipur Rajasthan-313001");
        buyerInfo.put("gstin", "GSTIN/UIN : 08BONPS2836E2ZL");
        buyerInfo.put("stateName", "State Name : Rajasthan");
        buyerInfo.put("placeOfSupply", "Place of Supplay : Rajasthan");
        buyerInfo.put("contactPerson", "Contact Person :");
        buyerInfo.put("contact", "Contact : +916377396347");

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

        try {
            document.add(createInvoiceInfoCell("buyerInfo", buyerInfoStatic, buyerCompanyTable, font));
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    public static PdfPTable createProductDetailsTable(SalesOrderCompanyDTO salesOrderCompanyDTO, List<SalesOrderProductDetailsDTO> listOfProductData, float[] columnSizeOfTable) {

        PdfPTable productDetailsData = new PdfPTable(columnSizeOfTable);
        productDetailsData.setWidthPercentage(90);
        productDetailsData.setSpacingAfter(-10f);
        float minHeight = 255f;
        float minHeightTotal = 20f;

        StringBuilder SNoData = new StringBuilder();
        StringBuilder productNameData = new StringBuilder();
        StringBuilder productTypeData = new StringBuilder();
        StringBuilder quantityData = new StringBuilder();
        StringBuilder priceData = new StringBuilder();
        StringBuilder totalData = new StringBuilder();
        StringBuilder hsnCodeData = new StringBuilder();

        for (int i = 0; i < listOfProductData.size(); i++) {
            SalesOrderProductDetailsDTO dto = listOfProductData.get(i);

            SNoData.append(i + 1).append("\n");
            productNameData.append(dto.getProductName()).append("\n");
            productTypeData.append(dto.getProductType()).append("\n");
            quantityData.append(String.format("%.2f", dto.getQuantity())).append("\n");
            priceData.append(String.format("%.2f", dto.getPrice())).append("\n");
            totalData.append(String.format("%.2f", dto.getTotal())).append("\n");
            hsnCodeData.append(dto.getHsnCode()).append("\n");
        }

        if (salesOrderCompanyDTO.getGstType().equals("IGST18[18%]")) {
            productNameData.append("\n\nIntegrated Tax\nROUND OFF");
            totalData.append("\n\n").append(String.format("%.2f", salesOrderCompanyDTO.getTotalTaxAmount()));
            totalData.append("\n").append(CommonConstant.extractDecimalPart(salesOrderCompanyDTO.getTotalTaxableAmount()));
        } else if (salesOrderCompanyDTO.getGstType().equals("LGST18[18%]")) {
            productTypeData.append("\n\nCGST\nSGST\nROUND OFF");
            totalData.append("\n\n").append(String.format("%.2f", salesOrderCompanyDTO.getTotalTaxAmount() / 2));
            totalData.append("\n").append(String.format("%.2f", salesOrderCompanyDTO.getTotalTaxAmount() / 2));
            totalData.append("\n").append(CommonConstant.extractDecimalPart(salesOrderCompanyDTO.getTotalTaxableAmount()));
        }

        productDetailsData.addCell(createCell("" + SNoData.toString(), Element.ALIGN_CENTER, minHeight,"detailsBody"));
        productDetailsData.addCell(createCell("" + productNameData.toString(), Element.ALIGN_CENTER, minHeight,"detailsBody"));
        productDetailsData.addCell(createCell("" + hsnCodeData.toString(), Element.ALIGN_CENTER, minHeight,"detailsBody"));
        productDetailsData.addCell(createCell("" + quantityData.toString(), Element.ALIGN_RIGHT, minHeight,"detailsBody"));
        productDetailsData.addCell(createCell("" + priceData.toString(), Element.ALIGN_RIGHT, minHeight,"detailsBody"));
        productDetailsData.addCell(createCell("" + productTypeData.toString(), Element.ALIGN_CENTER, minHeight,"detailsBody"));
        productDetailsData.addCell(createCell("" + totalData.toString(), Element.ALIGN_RIGHT, minHeight,"detailsBody"));

        return productDetailsData;
    }

    public static PdfPTable createProductDetailsFotterTable(SalesOrderCompanyDTO salesOrderCompanyDTO, List<SalesOrderProductDetailsDTO> listOfProductData, float[] columnSizeOfTable) {

        PdfPTable productDetailsData = new PdfPTable(columnSizeOfTable);
        productDetailsData.setWidthPercentage(90);
        productDetailsData.setSpacingBefore(10f);
        float minHeight = 0f;

        productDetailsData.addCell(createCell("", Element.ALIGN_RIGHT, minHeight,"detailsFotter"));
        productDetailsData.addCell(createCell("Total", Element.ALIGN_RIGHT, minHeight,"detailsFotter"));
        productDetailsData.addCell(createCell("", Element.ALIGN_RIGHT, minHeight,"detailsFotter"));
        productDetailsData.addCell(createCell(""+30f, Element.ALIGN_RIGHT, minHeight,"detailsFotter"));
        productDetailsData.addCell(createCell("", Element.ALIGN_RIGHT, minHeight,"detailsFotter"));
        productDetailsData.addCell(createCell("", Element.ALIGN_RIGHT, minHeight,"detailsFotter"));
        productDetailsData.addCell(createCell(""+salesOrderCompanyDTO.getTotalTaxableAmount(), Element.ALIGN_RIGHT, minHeight,"detailsFotter"));

        return productDetailsData;
    }

    private static PdfPCell createCell(String text, int alignment, float minHeight,String contentType) {
        PdfPCell cell = new PdfPCell();
        cell.setPaddingTop(-5f);
        cell.setMinimumHeight(minHeight);
        Paragraph paragraph = createParagraph(text, alignment,contentType);
        cell.addElement(paragraph);
        return cell;
    }

    private static Paragraph createParagraph(String text, int alignment,String contentType) {
        Font font = PdfConfig.PdfFont(contentType.equals("detailsBody") ? 8f : 11f);
        Paragraph paragraph = new Paragraph(text, font);
        paragraph.setAlignment(alignment);
        if (text.contains("\n\n")) {
            paragraph.setAlignment(Element.ALIGN_RIGHT);
        }
        return paragraph;
    }
}
