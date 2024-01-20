package com.samplepractice.services.expenseservice;

import com.samplepractice.dto.expensedto.ExpenseDTO;

public interface ExpenseService {

    String createExpense(ExpenseDTO expenseDTO) throws Exception;

}
