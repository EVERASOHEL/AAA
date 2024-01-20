package com.samplepractice.dto.expensedto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCategoryDTO {

    private Long expenseCategoryId;
    private Long companyId;
    private String categoryName;
    private String description;

}
