package com.samplepractice.serviceimplementation.expenseserviceImpl;

import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.dto.expensedto.ExpenseCategoryDTO;
import com.samplepractice.model.commondto.TitleValueDTO;
import com.samplepractice.model.expensemodels.ExpenseCategoryModel;
import com.samplepractice.repository.expenseRepository.ExpenseCategoryRepository;
import com.samplepractice.services.expenseservice.ExpenseCategoryService;
import com.samplepractice.validator.CommonValidatorAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class ExpenseCategoryServiceImpl implements ExpenseCategoryService {

    private final ExpenseCategoryRepository expenseCategoryRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public ExpenseCategoryServiceImpl(ExpenseCategoryRepository expenseCategoryRepository) {
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    @Transactional
    @Override
    public String createNewCategory(ExpenseCategoryDTO expenseCategoryDTO) throws Exception {

//        expenseCategoryValidation(expenseCategoryDTO);

        expenseCategoryRepository.save(new ExpenseCategoryModel(expenseCategoryDTO));

        return (expenseCategoryDTO.getExpenseCategoryId()==null) ? "Expense category successfully created." : "Expense category successfully updated.";
    }

//    private void expenseCategoryValidation(ExpenseCategoryDTO expenseCategoryDTO) throws Exception {
//        CommonValidatorAppException.objectsIsNullAndIsDigit("Expense Category Id", expenseCategoryDTO.getExpenseCategoryId());
//    }

    @Override
    @Transactional
    public Page<ExpenseCategoryDTO> getAllExpenseCategory(Pageable pageable) {
        String queryString = "select ec.categoryid, c.companyname, ec.categoryname, ec.description, ec.createddate,count(ec.categoryid) over() as totalcount FROM tbl_expense_category as ec left join company c on ec.companyid=c.id order by ec.createddate asc";

        if (Objects.nonNull(pageable)) {
            queryString = queryString + " OFFSET :firstElement ROWS FETCH NEXT :maxElement ROWS ONLY";
        }

        Query query = entityManager.createNativeQuery(queryString);

        if (Objects.nonNull(pageable)) {
            query.setParameter("firstElement", pageable.getPageNumber() * pageable.getPageSize());
            query.setParameter("maxElement", pageable.getPageSize());
        }

        List<Object[]> resultList = query.getResultList();
        List<ExpenseCategoryDTO> expenseCategoryDTOS = new ArrayList<>();
        resultList.forEach(list -> expenseCategoryDTOS.add(new ExpenseCategoryDTO((Object[]) list)));

        if (Objects.isNull(pageable)) {
            if (expenseCategoryDTOS.size() == 0) {
                pageable = PageRequest.of(0, 1);
            } else {
                pageable = PageRequest.of(0, expenseCategoryDTOS.size());
            }
        }

        if (io.jsonwebtoken.lang.Collections.isEmpty(expenseCategoryDTOS)) {
            return new PageImpl<>(new ArrayList<>(), pageable, new ArrayList<>().size());
        }
        return new PageImpl<>(expenseCategoryDTOS, pageable, expenseCategoryDTOS.get(0).getTotalcount());
    }

    @Override
    public List<TitleValueDTO> getAllExpenseCategory() {
        return expenseCategoryRepository.findAllExpenseCategory();
    }

    @Override
    public Long findCompanyIdByExpenseCategoryId(Long expenseCategoryId) {
        return expenseCategoryRepository.findCompanyIdByCategoryId(expenseCategoryId);
    }
}
