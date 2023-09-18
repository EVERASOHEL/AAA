package com.samplepractice.pdfBean.salesPdf;

import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;

public class CompanyInfo {

    private String text;
    private Font font;
    private float firstLineIndent;
    private float spacingBefore;
    private float spacingAfter;
    private float multipliedLeading;

    public CompanyInfo(String text, Font font, float firstLineIndent, float spacingBefore, float spacingAfter, float multipliedLeading) {
        this.text = text;
        this.font = font;
        this.firstLineIndent = firstLineIndent;
        this.spacingBefore = spacingBefore;
        this.spacingAfter = spacingAfter;
        this.multipliedLeading = multipliedLeading;
    }

    public Paragraph createParagraph() {
        Paragraph paragraph = new Paragraph(text, font);
        paragraph.setFirstLineIndent(firstLineIndent);
        paragraph.setSpacingBefore(spacingBefore);
        paragraph.setSpacingAfter(spacingAfter);
        paragraph.setMultipliedLeading(multipliedLeading);
        return paragraph;
    }
}
