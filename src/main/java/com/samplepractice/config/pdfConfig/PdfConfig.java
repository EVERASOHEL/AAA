package com.samplepractice.config.pdfConfig;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.samplepractice.dto.salesorderdto.GstSummaryProductDetailsDTO;
import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;
import com.samplepractice.dto.salesorderdto.SalesOrderProductDetailsDTO;
import com.samplepractice.validator.AppException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
@AllArgsConstructor
public class PdfConfig {

    public static Font PdfFont(float fontSize) {
        return FontFactory.getFont(FontFactory.TIMES, fontSize, com.itextpdf.text.Font.BOLD);
    }

    public static PdfPCell createCell(String text, int alignment, float minHeight, String contentType) {
        PdfPCell cell = new PdfPCell();
        cell.setPaddingTop(-5f);
        cell.setMinimumHeight(minHeight);
        Paragraph paragraph = createParagraph(text, alignment, contentType);
        cell.addElement(paragraph);
        return cell;
    }

    public static Paragraph createParagraph(String text, int alignment, String contentType) {
        Font font = PdfConfig.PdfFont(contentType.equals("detailsBody") ? 9f : 11f);

        Paragraph paragraph=null;
        if (text.startsWith("Integrated Tax") || text.startsWith("CGST") || text.startsWith("SGST") || text.contains("ROUND OFF") || text.contains("ROUND ON")) {
            paragraph = new Paragraph(text, font);
            paragraph.setAlignment(Element.ALIGN_LEFT);
        }else{
            paragraph = new Paragraph(text, font);
            paragraph.setAlignment(alignment);
            if (text.contains("\n\n")) {
                paragraph.setAlignment(Element.ALIGN_RIGHT);
            }
        }
        return paragraph;
    }

    public static PdfPCell createPdfPCellWithPadding(Paragraph paragraph, float paddingTop) {
        PdfPCell cell = new PdfPCell();
        cell.setPaddingTop(paddingTop);
        cell.addElement(paragraph);
        return cell;
    }

    public static PdfPCell createPdfPCell(String text, Font font, int alignment, float paddingTop, int colspan, int rowspan) {
        PdfPCell cell = new PdfPCell(new Paragraph(text, font));
        cell.setHorizontalAlignment(alignment);
        cell.setPaddingTop(paddingTop);
        cell.setColspan(colspan);
        cell.setRowspan(rowspan);
        return cell;
    }

    public static PdfPCell createPdfPCell(String text, Font font, int alignment, float paddingTop, int colspan) {
        PdfPCell cell = new PdfPCell(new Paragraph(text, font));
        cell.setHorizontalAlignment(alignment);
        cell.setPaddingTop(paddingTop);
        cell.setColspan(colspan);
        return cell;
    }

    public static PdfPCell createTaxCell(String gstType, Font font) {
        String taxType = gstType.startsWith("L/") ? "Central Tax" : (gstType.startsWith("I/") ? "Integrated Tax" : "");
        if (taxType.isEmpty()) {
            throw new AppException("Invalid GST type: " + gstType);
        }

        PdfPCell tax = createPdfPCell(taxType, font, Element.ALIGN_CENTER, -2f, 2, 0);
        return tax;
    }

    public static void addCellsToTable(PdfPTable table, PdfPCell... cells) {
        for (PdfPCell cell : cells) {
            table.addCell(cell);
        }
    }

    PdfPCell createCell(String text, int colspan, int rowspan) {
        Font font = PdfConfig.PdfFont(9f);
        PdfPCell cell = new PdfPCell(new Paragraph(text, font));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPaddingTop(-2f);
        cell.setColspan(colspan);
        cell.setRowspan(rowspan);
        return cell;
    }

    public static List<GstSummaryProductDetailsDTO> sameHSNCodeforCalculatePrices(SalesOrderCompanyDTO salesOrderCompanyDTO) {
        Map<String, Object> productDetailsMap = new HashMap<>();

        // Copy the original list to newList
        List<SalesOrderProductDetailsDTO> productDetailsDTOList = new ArrayList<>(salesOrderCompanyDTO.getSalesOrderProductDetailsDTOList());

        List<GstSummaryProductDetailsDTO> modifiedList = new ArrayList<>();

        List<GstSummaryProductDetailsDTO> summaryProductDetailsDTOS = new ArrayList<>();

        productDetailsDTOList.forEach(salesOrderProductDetailsDTO ->
                summaryProductDetailsDTOS.add(new GstSummaryProductDetailsDTO(
                        salesOrderProductDetailsDTO.getTotal(),
                        salesOrderProductDetailsDTO.getHsnCode())
                ));

        while (!summaryProductDetailsDTOS.isEmpty()) {
            GstSummaryProductDetailsDTO currentProduct = summaryProductDetailsDTOS.remove(0);
            modifiedList.add(currentProduct);

            // Iterate over the remaining products and combine prices
            summaryProductDetailsDTOS.removeIf(nextProduct -> {
                if (currentProduct.getHsnCode().equals(nextProduct.getHsnCode())) {
                    float currentValue = currentProduct.getTotal();
                    float updatedValue = currentValue + nextProduct.getTotal();
                    currentProduct.setTotal(updatedValue);
                    return true; // Remove the nextProduct from the list
                }
                return false; // Keep the nextProduct in the list
            });
        }

        return modifiedList;
    }

}
