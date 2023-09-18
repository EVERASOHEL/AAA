package com.samplepractice.config.pdfConfig;

import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;

import java.util.List;

public class CustomPdfPCell{

    public static PdfPCell CustomCell(String content, Font font, int alignment,float... spacing){
        PdfPCell cell = new PdfPCell();
        cell.setBorder(Rectangle.NO_BORDER);
        Paragraph paragraph = new Paragraph(content, font);
        if(spacing.length>0){
            paragraph.setSpacingAfter(spacing[0]);
        }else{
            paragraph.setSpacingBefore(spacing[1]);
        }
        paragraph.setAlignment(alignment);
        cell.addElement(paragraph);
        return cell;
    }



//    public static PdfPTable createTable(List<TextWithFont> companyInfo, List<TextWithFont> invoiceDetails, int columns) {
//        PdfPTable table = new PdfPTable(columns);
//        table.setWidthPercentage(90);
//
//        for (TextWithFont textWithFont : companyInfo) {
//            PdfPCell cell = createPdfPCell(textWithFont);
//            table.addCell(cell);
//        }
//
//        for (TextWithFont textWithFont : invoiceDetails) {
//            PdfPCell cell = createPdfPCell(textWithFont);
//            table.addCell(cell);
//        }
//
//        return table;
//    }
//
//    public static PdfPCell createPdfPCell(TextWithFont textWithFont) {
//        PdfPCell cell = new PdfPCell();
//        cell.setBorder(Rectangle.NO_BORDER);
//
//        Paragraph paragraph = new Paragraph(textWithFont.getText(), textWithFont.getFont());
//        paragraph.setSpacingBefore(textWithFont.getSpacingBefore());
//        paragraph.setSpacingAfter(textWithFont.getSpacingAfter());
//
//        cell.addElement(paragraph);
//
//        return cell;
//    }
}
