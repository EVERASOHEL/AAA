package com.samplepractice.services.expenseservice;

import com.samplepractice.dto.expensedto.ExpenseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ExpenseService {

    String createExpense(ExpenseDTO expenseDTO) throws Exception;
    Page<ExpenseDTO> getAllExpenseList(Pageable pageable);

}
