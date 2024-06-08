package com.samplepractice.serviceimplementation.expenseserviceImpl;

import com.samplepractice.dto.expensedto.ExpenseDTO;
import com.samplepractice.model.expensemodels.ExpenseModel;
import com.samplepractice.repository.expenseRepository.ExpenseRepository;
import com.samplepractice.services.expenseservice.ExpenseCategoryService;
import com.samplepractice.services.expenseservice.ExpenseService;
import com.samplepractice.validator.CommonValidatorAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseCategoryService expenseCategoryService;

    @Autowired
    public ExpenseServiceImpl(ExpenseRepository expenseRepository, ExpenseCategoryService expenseCategoryService) {
        this.expenseRepository = expenseRepository;
        this.expenseCategoryService = expenseCategoryService;
    }


    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public String createExpense(ExpenseDTO expenseDTO) throws Exception {

        expenseValidation(expenseDTO);

        Long companyId = expenseCategoryService.findCompanyIdByExpenseCategoryId(expenseDTO.getExpenseCategoryId());
        if (Objects.isNull(companyId)) {
            CommonValidatorAppException.objectsIsNullAndIsDigit("Company Id Not Found", expenseDTO.getCompanyId());
        }

        expenseRepository.save(new ExpenseModel(expenseDTO,companyId));

        return (expenseDTO.getExpenseId() == null) ? "expense successfully created!" : "expense details successfully updated!";
    }

    private void expenseValidation(ExpenseDTO expenseDTO) throws Exception {
        CommonValidatorAppException.objectsIsNullAndIsDigit("Expense Category Id", expenseDTO.getExpenseCategoryId());
        CommonValidatorAppException.stringsIsNullOrEmpty("Expense Date", expenseDTO.getExpenseDate().toString());
        CommonValidatorAppException.objectsIsNullAndIsDigit("Expense Amount", expenseDTO.getExpenseAmount());
        CommonValidatorAppException.stringsIsNullOrEmpty("Description", expenseDTO.getDescription());
        CommonValidatorAppException.stringsIsNullOrEmpty("Payment Method", expenseDTO.getPaymentMethod());
    }

    @Override
    @Transactional
    public Page<ExpenseDTO> getAllExpenseList(Pageable pageable) {
        String queryString = "select e.expenseid,ec.categoryname, e.expensedate, e.amount, e.description, e.paymentmethod,count(e.expenseid) over() as totalcount FROM tbl_expense e left join tbl_expense_category ec on e.expensecategoryid=ec.categoryid order by ec.createddate asc";

        if (Objects.nonNull(pageable)) {
            queryString = queryString + " OFFSET :firstElement ROWS FETCH NEXT :maxElement ROWS ONLY";
        }

        Query query = entityManager.createNativeQuery(queryString);

        if (Objects.nonNull(pageable)) {
            query.setParameter("firstElement", pageable.getPageNumber() * pageable.getPageSize());
            query.setParameter("maxElement", pageable.getPageSize());
        }

        List<Object[]> resultList = query.getResultList();
        List<ExpenseDTO> expenseDTOS = new ArrayList<>();
        resultList.forEach(list -> expenseDTOS.add(new ExpenseDTO((Object[]) list)));

        if (Objects.isNull(pageable)) {
            if (expenseDTOS.size() == 0) {
                pageable = PageRequest.of(0, 1);
            } else {
                pageable = PageRequest.of(0, expenseDTOS.size());
            }
        }

        if (io.jsonwebtoken.lang.Collections.isEmpty(expenseDTOS)) {
            return new PageImpl<>(new ArrayList<>(), pageable, new ArrayList<>().size());
        }
        return new PageImpl<>(expenseDTOS, pageable, expenseDTOS.get(0).getTotalcount());
    }
}
