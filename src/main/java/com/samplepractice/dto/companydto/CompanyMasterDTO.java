package com.samplepractice.dto.companydto;

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
public class CompanyMasterDTO {

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
        this.id=Long.parseLong(list[0].toString());
        this.companyName =(String) list[1];
        this.address =(String) list[2];
        this.phoneNo=(String) list[3];
        this.stateName=(String) list[4];
        this.companyGstNo=(String)list[6];
        this.companyType=(String)list[7];
        this.companyPanNumber=(String)list[8];
        this.totalcount = Long.parseLong(list[9].toString());
//        this.totalcount = Objects.nonNull(list[5]) ? ((Integer) list[5]).longValue() : null;
    }
}
