package com.samplepractice.services.expenseservice;

import com.samplepractice.dto.expensedto.ExpenseCategoryDTO;

public interface ExpenseCategoryService {

    String createNewCategory(ExpenseCategoryDTO expenseCategoryDTO) throws Exception;

}
