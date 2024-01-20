package com.samplepractice.repository.expenseRepository;

import com.samplepractice.model.expensemodels.ExpenseCategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategoryModel,Long> {
}
