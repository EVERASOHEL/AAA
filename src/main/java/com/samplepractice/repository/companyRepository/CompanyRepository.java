package com.samplepractice.repository.companyRepository;

import com.samplepractice.model.companymodels.CompanyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyModel,Long> {

//    @Transactional
//    CompanyModel save(CompanyModel companyModel);

    @Query(nativeQuery = true,value="select companyname from company where (:companyType is null or companytype=:companyType)")
    List<String> getAllCompnayName(Object companyType);

    @Query(nativeQuery = true,value="select c.companytype from company c where c.companyname=:companyName")
    String getCompanyTypebyCompanyName(String companyName);

    CompanyModel findByCompanyName(String companyName);

    @Query(nativeQuery=true,value = "select c.* from company c where (:companyType is null or companytype=:companyType)")
    List<CompanyModel> getAllCompanyByCompanyType(String companyType);

    @Query(nativeQuery=true, value="select c.* from company c")
    List<CompanyModel> getAllCompany();
}
