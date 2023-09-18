package com.samplepractice.config.pdfConfig;

import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class PdfConfig {

    public static Font PdfFont(float fontSize){
        return FontFactory.getFont(FontFactory.TIMES, fontSize, com.itextpdf.text.Font.BOLD);
    }
}
