package com.samplepractice.dto.expensedto;

import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCategoryDTO {

    private Long expenseCategoryId;
    private Long companyId;
    private String companyName;
    private String categoryName;
    private String description;
    private Long totalcount;

    public ExpenseCategoryDTO(Object[] list) {
        this.expenseCategoryId = Objects.nonNull(list[0]) ? Long.parseLong(list[0].toString()) : null;
        this.companyName = Objects.nonNull(list[1]) ? String.valueOf(list[1]) : null;
        this.categoryName = Objects.nonNull(list[2]) ? String.valueOf(list[2]) : null;
        this.description = Objects.nonNull(list[3]) ? String.valueOf(list[3]) : null;
        this.totalcount = Objects.nonNull(list[5]) ? Long.parseLong(list[5].toString()) : null;
    }

}
