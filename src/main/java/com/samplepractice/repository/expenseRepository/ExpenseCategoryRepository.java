package com.samplepractice.repository.expenseRepository;

import com.samplepractice.model.commondto.TitleValueDTO;
import com.samplepractice.model.expensemodels.ExpenseCategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategoryModel, Long> {

    @Query("SELECT NEW com.samplepractice.model.commondto.TitleValueDTO(CAST(ec.expenseCategoryId AS string), ec.categoryName) FROM ExpenseCategoryModel ec")
    List<TitleValueDTO> findAllExpenseCategory();

    @Query("select ec.companyId from ExpenseCategoryModel ec where ec.expenseCategoryId=?1")
    Long findCompanyIdByCategoryId(Long categoryId);
}
