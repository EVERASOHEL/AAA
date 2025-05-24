package com.samplepractice.dto.companydto;

import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import com.samplepractice.model.companymodels.CompanyModel;
import com.samplepractice.model.companymodels.CompanyModelCount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyMasterDTO extends AbstractAuditingEntity {

    private Long id;
    public String companyName;
    private String address;
    private String phoneNo;
    private String stateName;
    private Long totalcount;
    private String companyType;
    private String companyGstNo;
    private String companyPanNumber;
    private String companyPhoneNumber;

    public CompanyMasterDTO(CompanyModel companyModel) {
        this.companyName = companyModel.getCompanyName();
        this.address = companyModel.getAddress();
        this.phoneNo = companyModel.getPhoneNo();
        this.stateName = companyModel.getStateName();
        this.companyGstNo = companyModel.getCompanyGstNo();
        this.companyPanNumber = companyModel.getCompanyPanNumber();
    }

    public CompanyMasterDTO(CompanyModelCount companyModelCount) {
        this.id= Objects.nonNull(companyModelCount.getId()) ? companyModelCount.getId() :null;
        this.companyName=companyModelCount.getCompanyName();
        this.address=companyModelCount.getAddress();
        this.phoneNo=companyModelCount.getPhoneNo();
        this.stateName=companyModelCount.getStateName();
        this.totalcount=companyModelCount.getTotalcount();
    }

    public CompanyMasterDTO(Object[] list) {
//        this.id = Objects.nonNull(list[0]) ? ((Integer) list[0]).longValue() : null;
//        this.id=Long.parseLong(String.valueOf(list[0]));
        this.id = Objects.nonNull(list[0]) ? Long.parseLong(list[0].toString()) : null;
        this.companyName = Objects.nonNull(list[1]) ? list[1].toString() : null;
        this.address = Objects.nonNull(list[2]) ? list[2].toString() : null;
        this.phoneNo = Objects.nonNull(list[3]) ? list[3].toString() : null;
        this.stateName = Objects.nonNull(list[4]) ? list[4].toString() : null;
        this.companyGstNo = Objects.nonNull(list[6]) ? list[6].toString() : null;
        this.companyType = Objects.nonNull(list[7]) ? list[7].toString() : null;
        this.companyPanNumber = Objects.nonNull(list[8]) ? list[8].toString() : null;
        this.totalcount = Objects.nonNull(list[9]) ? Long.parseLong(list[9].toString()) : null;
//        this.totalcount = Objects.nonNull(list[5]) ? ((Integer) list[5]).longValue() : null;
    }
}
