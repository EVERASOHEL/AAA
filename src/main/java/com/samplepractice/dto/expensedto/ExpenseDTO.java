package com.samplepractice.dto.expensedto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {

    private Long expenseId;
    private Long expenseCategoryId;
    private Long companyId;
    private Date expenseDate;
    private Float expenseAmount;
    private String description;
    private String paymentMethod;
}
