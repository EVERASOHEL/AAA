package com.samplepractice.services.expenseservice;

import com.samplepractice.dto.expensedto.ExpenseCategoryDTO;
import com.samplepractice.model.commondto.TitleValueDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExpenseCategoryService {

    String createNewCategory(ExpenseCategoryDTO expenseCategoryDTO) throws Exception;
    Page<ExpenseCategoryDTO> getAllExpenseCategory(Pageable pageable);
    List<TitleValueDTO> getAllExpenseCategory();
    Long findCompanyIdByExpenseCategoryId(Long expenseCategoryId);

}
