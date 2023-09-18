package com.samplepractice.config.pdfConfig;

import com.itextpdf.text.Font;

public class TextWithFont {

    private String text;
    private Font font;
    private float spacingBefore;
    private float spacingAfter;

    public TextWithFont() {
    }

    public TextWithFont(String text, Font font, float spacingBefore, float spacingAfter) {
        this.text = text;
        this.font = font;
        this.spacingBefore = spacingBefore;
        this.spacingAfter = spacingAfter;
    }

    // Getters and setters for the private fields if needed

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Font getFont() {
        return font;
    }

    public void setFont(Font font) {
        this.font = font;
    }

    public float getSpacingBefore() {
        return spacingBefore;
    }

    public void setSpacingBefore(float spacingBefore) {
        this.spacingBefore = spacingBefore;
    }

    public float getSpacingAfter() {
        return spacingAfter;
    }

    public void setSpacingAfter(float spacingAfter) {
        this.spacingAfter = spacingAfter;
    }
}
