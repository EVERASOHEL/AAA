package com.samplepractice.controller.expensecontroller;

import com.samplepractice.dto.expensedto.ExpenseDTO;
import com.samplepractice.services.expenseservice.ExpenseService;
import com.samplepractice.util.Impl.CommonResponse;
import com.samplepractice.validator.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenseController")
public class ExpenseController {

    private final String moduleName="Expense";
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/saveExpense")
    public ResponseEntity<?> saveOrderRequest(@RequestBody ExpenseDTO expenseDTO) {
        try {
            return CommonResponse.getData(expenseService.createExpense(expenseDTO));
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @PostMapping("/getExpenseList")
    public ResponseEntity<?> getExpenseCategorylist(Pageable pageable) {
        try {
            return CommonResponse.getData(expenseService.getAllExpenseList(pageable));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

}
