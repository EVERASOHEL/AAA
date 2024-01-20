package com.samplepractice.repository.expenseRepository;

import com.samplepractice.model.expensemodels.ExpenseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<ExpenseModel,Long> {
}
