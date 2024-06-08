package com.samplepractice.dto.expensedto;

import com.samplepractice.config.CommonConstant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {

    private Long expenseId;
    private Long expenseCategoryId;
    private Long companyId;
    private Date expenseDate;
    private String expenseDateString;
    private Float expenseAmount;
    private String description;
    private String paymentMethod;
    private Long totalcount;
    private String expenseName;

    public ExpenseDTO(Object[] list) {
        this.expenseId=Long.parseLong(list[0].toString());
        this.expenseName=(String)list[1];
        this.expenseDateString = Objects.nonNull(list[2]) ? CommonConstant.SIMPLE_DATE_FORMAT_DD_MM_YYYY_HH_MM.format(list[2]) : null;
        this.expenseAmount=Float.parseFloat(list[3].toString());
        this.description=(String)list[4];
        this.paymentMethod=(String)list[5];
        this.totalcount=Long.parseLong(list[6].toString());
    }
}
