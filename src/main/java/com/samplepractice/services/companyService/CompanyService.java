package com.samplepractice.services.companyService;

import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.model.commondto.TitleValueDTO;
import com.samplepractice.model.companymodels.CompanyModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface CompanyService {

    String saveNewCompany(CompanyMasterDTO companyMasterDTO) throws Exception;
    Page<CompanyMasterDTO> getAllCompany(Pageable pageable);
    String deleteCompanyById(Long companyId);
    List<TitleValueDTO> getAllCompanyName(String companyType);
    String getCompanyTypeByCompanyName(String companyName);

    CompanyMasterDTO getCompanyDetailsByCompanyName(String companyName);
    List<TitleValueDTO> getAllCompanyNameByCompanyType(String companyType) throws Exception;
}
