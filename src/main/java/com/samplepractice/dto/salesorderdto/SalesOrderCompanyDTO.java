package com.samplepractice.dto.salesorderdto;

import com.samplepractice.config.CommonConstant;
import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.model.CustomDataSource;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.sf.jasperreports.engine.JasperReport;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SalesOrderCompanyDTO{

    private Long id;
    private Date orderDate;
    private String voucherNo;
    private String companyName;
    private Float totalAmount;
    private Float totalTaxAmount;
    private Float totalTaxableAmount;
    private String gstType;
    private Long totalcount;
    private String orderDateString;
    private Float payAmount;
    private List<SalesOrderProductDetailsDTO> salesOrderProductDetailsDTOList;

    public SalesOrderCompanyDTO(Object[] list) {
        this.id = Objects.nonNull(list[0]) ? Long.parseLong(list[0].toString()) : null;
        this.orderDateString = Objects.nonNull(list[1]) ? CommonConstant.SIMPLE_DATE_FORMAT_DD_MM_YYYY_HH_MM.format(list[1]) : null;
        this.voucherNo = Objects.nonNull(list[2]) ? list[2].toString() : null;
        companyName = Objects.nonNull(list[3]) ? list[3].toString() : null;
        this.totalAmount = Objects.nonNull(list[4]) ? Float.parseFloat(list[4].toString()) : null;
        this.totalTaxAmount = Objects.nonNull(list[5]) ? Float.parseFloat(list[5].toString()) : null;
        this.totalTaxableAmount = Objects.nonNull(list[6]) ? Float.parseFloat(list[6].toString()) : null;
        this.gstType = Objects.nonNull(list[8]) ? list[8].toString() : null;
        this.totalcount = Objects.nonNull(list[9]) ? Long.parseLong(list[9].toString()) : null;
        this.payAmount = Objects.nonNull(list[10]) ? Float.parseFloat(list[10].toString()) : 0.00f;
    }

    public SalesOrderCompanyDTO(List<SalesOrderProductDetailsDTO> salesOrderCompanyDTO){
        this.salesOrderProductDetailsDTOList=salesOrderCompanyDTO;
    }
}
