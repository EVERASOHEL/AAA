package com.samplepractice.serviceimplementation.expenseserviceImpl;

import com.samplepractice.dto.expensedto.ExpenseDTO;
import com.samplepractice.model.expensemodels.ExpenseModel;
import com.samplepractice.repository.expenseRepository.ExpenseRepository;
import com.samplepractice.services.expenseservice.ExpenseService;
import com.samplepractice.validator.CommonValidatorAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Transactional
    @Override
    public String createExpense(ExpenseDTO expenseDTO) throws Exception {

        expenseValidation(expenseDTO);

        expenseRepository.save(new ExpenseModel(expenseDTO));

        return (expenseDTO.getExpenseId()==null) ? "expense successfully created!" : "expense details successfully updated!";
    }

    private void expenseValidation(ExpenseDTO expenseDTO) throws Exception {
        CommonValidatorAppException.objectsIsNullAndIsDigit("Expense Category Id", expenseDTO.getExpenseCategoryId());
        CommonValidatorAppException.stringsIsNullOrEmpty("Expense Date", expenseDTO.getExpenseDate().toString());
        CommonValidatorAppException.objectsIsNullAndIsDigit("Expense Amount", expenseDTO.getExpenseAmount());
        CommonValidatorAppException.stringsIsNullOrEmpty("Description", expenseDTO.getDescription());
        CommonValidatorAppException.stringsIsNullOrEmpty("Payment Method", expenseDTO.getPaymentMethod());
    }
}
