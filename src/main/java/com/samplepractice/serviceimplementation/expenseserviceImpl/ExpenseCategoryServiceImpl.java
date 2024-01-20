package com.samplepractice.serviceimplementation.expenseserviceImpl;

import com.samplepractice.dto.expensedto.ExpenseCategoryDTO;
import com.samplepractice.model.expensemodels.ExpenseCategoryModel;
import com.samplepractice.repository.expenseRepository.ExpenseCategoryRepository;
import com.samplepractice.services.expenseservice.ExpenseCategoryService;
import com.samplepractice.validator.CommonValidatorAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public class ExpenseCategoryServiceImpl implements ExpenseCategoryService {

    private final ExpenseCategoryRepository expenseCategoryRepository;

    @Autowired
    public ExpenseCategoryServiceImpl(ExpenseCategoryRepository expenseCategoryRepository) {
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    @Transactional
    @Override
    public String createNewCategory(ExpenseCategoryDTO expenseCategoryDTO) throws Exception {

        expenseCategoryValidation(expenseCategoryDTO);

        expenseCategoryRepository.save(new ExpenseCategoryModel(expenseCategoryDTO));

        return (expenseCategoryDTO.getExpenseCategoryId()==null) ? "Expense category successfully created." : "Expense category successfully updated.";
    }

    private void expenseCategoryValidation(ExpenseCategoryDTO expenseCategoryDTO) throws Exception {
        CommonValidatorAppException.objectsIsNullAndIsDigit("Expense Category Id", expenseCategoryDTO.getExpenseCategoryId());
    }
}
