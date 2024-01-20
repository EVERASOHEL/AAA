package com.samplepractice.model.expensemodels;

import com.samplepractice.dto.expensedto.ExpenseDTO;
import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "tbl_expense")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("0")
public class ExpenseModel extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expenseid")
    private Long expenseId;

    @Column(name = "expensecategoryid")
    private Long expenseCategoryId;

    @Column(name = "companyid")
    private Long companyId;

    @Column(name = "expensedate")
    private Date expenseDate;

    @Column(name = "amount")
    private Float expenseAmount;

    @Column(name = "description")
    private String description;

    @Column(name = "paymentmethod")
    private String paymentMethod;

    public ExpenseModel(ExpenseDTO expenseDTO) {
        this.expenseId=Objects.nonNull(expenseDTO.getExpenseId()) ? expenseDTO.getExpenseId() : null;
        this.companyId= Objects.nonNull(expenseDTO.getCompanyId()) ? expenseDTO.getCompanyId() : null;
        this.expenseCategoryId=expenseDTO.getExpenseCategoryId();
        this.expenseAmount=expenseDTO.getExpenseAmount();
        this.expenseDate=expenseDTO.getExpenseDate();
        this.paymentMethod=expenseDTO.getPaymentMethod();
        this.description=expenseDTO.getDescription();
    }
}
