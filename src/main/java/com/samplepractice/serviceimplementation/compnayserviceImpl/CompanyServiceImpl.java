package com.samplepractice.serviceimplementation.compnayserviceImpl;

import com.google.common.base.Strings;
import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.model.commondto.TitleValueDTO;
import com.samplepractice.model.companymodels.CompanyModel;
import com.samplepractice.model.companymodels.CompanyModelCount;
import com.samplepractice.repository.companyRepository.CompanyRepository;
import com.samplepractice.services.companyService.CompanyService;
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
import java.util.*;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public String saveNewCompany(CompanyMasterDTO companyMasterDTO) throws Exception {

        CommonValidatorAppException.stringsIsNullOrEmpty("Company Type", companyMasterDTO.getCompanyType());
        CommonValidatorAppException.stringsIsNullOrEmpty("Company Name", companyMasterDTO.getCompanyName());
        CommonValidatorAppException.stringsIsNullOrEmpty("Address", companyMasterDTO.getAddress());
        CommonValidatorAppException.stringsIsNullOrEmpty("State Name", companyMasterDTO.getStateName());
        CommonValidatorAppException.stringsIsNullOrEmpty("Phone Number", companyMasterDTO.getPhoneNo());

        if (Objects.isNull(companyMasterDTO.getCompanyGstNo()) && Objects.isNull(companyMasterDTO.getCompanyPanNumber())) {
            CommonValidatorAppException.throwRequiredException("Please Insert GST Number or Pan Number");
        }

        companyRepository.save(new CompanyModel(companyMasterDTO));

        return Objects.nonNull(companyMasterDTO.getId()) ? "Company successfully Updated!" : "Company successfully created!";
    }

    @Override
    @Transactional
    public Page<CompanyMasterDTO> getAllCompany(Pageable pageable) {

        String queryString = "select cm.*,count(cm.id) over() as totalcount from company cm order by cm.createddate asc";

        if (Objects.nonNull(pageable)) {
            queryString = queryString + " OFFSET :firstElement ROWS FETCH NEXT :maxElement ROWS ONLY";
        }

        Query query = entityManager.createNativeQuery(queryString);

        if (Objects.nonNull(pageable)) {
            query.setParameter("firstElement", pageable.getPageNumber() * pageable.getPageSize());
            query.setParameter("maxElement", pageable.getPageSize());
        }

        List<Object[]> resultList = query.getResultList();
        List<CompanyMasterDTO> companyMasterDTOS = new ArrayList<>();
        resultList.forEach(list -> companyMasterDTOS.add(new CompanyMasterDTO((Object[]) list)));

        if (Objects.isNull(pageable)) {
            if (companyMasterDTOS.size() == 0) {
                pageable = PageRequest.of(0, 1);
            } else {
                pageable = PageRequest.of(0, companyMasterDTOS.size());
            }
        }
        if (io.jsonwebtoken.lang.Collections.isEmpty(companyMasterDTOS)) {
            return new PageImpl<>(new ArrayList<>(), pageable, new ArrayList<>().size());
        }
        return new PageImpl<>(companyMasterDTOS, pageable, companyMasterDTOS.get(0).getTotalcount());
    }

    @Override
    public String deleteCompanyById(Long companyId) {
        companyRepository.deleteById(companyId);
        return "Company Successfully Deleted!";
    }

    @Override
    @Transactional
    public List<TitleValueDTO> getAllCompanyName(String companyType) {
        entityManager.joinTransaction();

        String queryString = "select companyname from company c where (:companyType is null or c.companytype=cast(:companyType AS text))";

        String companyTypes = companyType.equals("null") ? null : companyType;

        Query query = entityManager.createNativeQuery(queryString);
        query.setParameter("companyType", Strings.isNullOrEmpty(companyTypes) ? null : companyTypes);

        List<TitleValueDTO> titleValueDTOList = new ArrayList<>();
        List<String> allCompnayName = query.getResultList();

        if(!io.jsonwebtoken.lang.Collections.isEmpty(allCompnayName)){
            for (String companyName :
                    allCompnayName) {
                titleValueDTOList.add(new TitleValueDTO(companyName, companyName));
            }
        }else{
            titleValueDTOList.add(new TitleValueDTO("",""));
        }
        return titleValueDTOList;
    }

    @Override
    public String getCompanyTypeByCompanyName(String companyName) {
        return companyRepository.getCompanyTypebyCompanyName(companyName);
    }
}
