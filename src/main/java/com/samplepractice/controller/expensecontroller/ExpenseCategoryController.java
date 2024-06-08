package com.samplepractice.controller.expensecontroller;

import com.samplepractice.dto.expensedto.ExpenseCategoryDTO;
import com.samplepractice.dto.expensedto.ExpenseDTO;
import com.samplepractice.services.expenseservice.ExpenseCategoryService;
import com.samplepractice.util.Impl.CommonResponse;
import com.samplepractice.validator.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenseCategoryController")
public class ExpenseCategoryController {

    private final String moduleName="ExpenseCategory";
    private final ExpenseCategoryService expenseCategoryService;

    @Autowired
    public ExpenseCategoryController(ExpenseCategoryService expenseCategoryService) {
        this.expenseCategoryService = expenseCategoryService;
    }

    @PostMapping("/saveExpenseCategory")
    public ResponseEntity<?> saveOrderRequest(@RequestBody ExpenseCategoryDTO expenseCategoryDTO) {
        try {
            return CommonResponse.getData(expenseCategoryService.createNewCategory(expenseCategoryDTO));
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @PostMapping("/getExpenseCategorylist")
    public ResponseEntity<?> getExpenseCategorylist(Pageable pageable) {
        try {
            return CommonResponse.getData(expenseCategoryService.getAllExpenseCategory(pageable));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/findAllExpenseCategoryName")
    public ResponseEntity<?> getAllExpenseCategoryName() {
        try {
            return CommonResponse.getData(expenseCategoryService.getAllExpenseCategory());
        } catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

}
