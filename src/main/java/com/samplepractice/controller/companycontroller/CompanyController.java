package com.samplepractice.controller.companycontroller;

import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.services.companyService.CompanyService;
import com.samplepractice.util.Impl.CommonResponse;
import com.samplepractice.validator.AppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/companyController")
public class CompanyController {

    private String moduleName="Product";
    
    @Autowired
    private CompanyService companyService;

    @PostMapping("/saveNewCompany")
    public ResponseEntity<?> saveorupdatecompany(@RequestBody CompanyMasterDTO companyMasterDTO) throws Exception {
        try {
            return CommonResponse.getData(companyService.saveNewCompany(companyMasterDTO));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @PostMapping("/getCompanylist")
    public ResponseEntity<?> getCompanylist(@RequestBody Map<String,String> filters,Pageable pageable) {
        try {
            return CommonResponse.getData(companyService.getAllCompany(filters,pageable));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @DeleteMapping("/deleteCompany/{companyId}")
    public ResponseEntity<?> getCompanylist(@PathVariable long companyId) {
        try {
            return CommonResponse.getData(companyService.deleteCompanyById(companyId));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getAllCompanyName/{companyType}")
    public ResponseEntity<?> getAllCompanyName(@PathVariable String companyType) {
        try {
            return CommonResponse.getData(companyService.getAllCompanyName(companyType));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getAllCompanyNameByCompanyType/{companyType}")
    public ResponseEntity<?> getAllCompanyNameByCompanyType(@PathVariable String companyType) {
        try {
            return CommonResponse.getData(companyService.getAllCompanyNameByCompanyType(companyType));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getAllTypeCompanyName")
    public ResponseEntity<?> getAllTypeCompanyName() {
        try {
            return CommonResponse.getData(companyService.getAllTypeCompanyName());
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }

    @GetMapping("/getCompanyState/{companyName}")
    public ResponseEntity<?> getCompanyState(@PathVariable String companyName) {
        try {
            return CommonResponse.getData(companyService.getCompanyStateByCompanyName(companyName));
        }catch (AppException ae) {
            return CommonResponse.exception(ae.getMessage());
        } catch (Exception e) {
            return CommonResponse.somethingWentWrong(moduleName, e);
        }
    }
}
