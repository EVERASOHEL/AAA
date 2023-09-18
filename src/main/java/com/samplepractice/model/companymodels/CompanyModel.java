package com.samplepractice.model.companymodels;

import com.samplepractice.dto.companydto.CompanyMasterDTO;
import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.GeneratedValue;

import javax.persistence.*;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "`company`")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue("0")
public class CompanyModel extends AbstractAuditingEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Long id;

    @Column(name = "`companyname`")
    private String companyName;

    @Column(name = "`address`")
    private String address;

    @Column(name = "`phoneno`")
    private String phoneNo;

    @Column(name = "`statename`")
    private String stateName;

    @Column(name = "`companygstno`")
    private String companyGstNo;

    @Column(name = "`companytype`")
    private String companyType;

    @Column(name = "`companypannumber`")
    private String companyPanNumber;

    public CompanyModel(CompanyMasterDTO companyMasterDTO){
        this.id= Objects.nonNull(companyMasterDTO.getId()) ? companyMasterDTO.getId() :null;
        this.companyName=companyMasterDTO.getCompanyName();
        this.address=companyMasterDTO.getAddress();
        this.phoneNo=companyMasterDTO.getPhoneNo();
        this.stateName=companyMasterDTO.getStateName();
        this.companyGstNo=companyMasterDTO.getCompanyGstNo();
        this.companyType=companyMasterDTO.getCompanyType();
        this.companyPanNumber=companyMasterDTO.getCompanyPanNumber();
    }
}
