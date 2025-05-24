package com.samplepractice.dto.pdfdto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ViewPdfDTO {

    private String pdfName;
    private String companyName;
    private String companyType;
    private String orderDateString;
    private Float totalTaxableAmount;
    private String voucherNo;
    private String toEmail;

}
