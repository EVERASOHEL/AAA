package com.samplepractice.model.expensemodels;

import com.samplepractice.dto.expensedto.ExpenseCategoryDTO;
import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tbl_expense_category")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("0")
public class ExpenseCategoryModel extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryid")
    private Long expenseCategoryId;

    @Column(name = "companyid")
    private Long companyId;

    @Column(name = "categoryname")
    private String categoryName;

    @Column(name = "description")
    private String description;

    public ExpenseCategoryModel(ExpenseCategoryDTO expenseCategoryDTO) {
        this.expenseCategoryId= Objects.nonNull(expenseCategoryDTO.getExpenseCategoryId()) ? expenseCategoryDTO.getExpenseCategoryId() :null;
        this.companyId = expenseCategoryDTO.getCompanyId();
        this.categoryName=expenseCategoryDTO.getCategoryName();
        this.description=expenseCategoryDTO.getDescription();
    }
}
