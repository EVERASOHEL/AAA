package com.samplepractice.model.companymodels;

import com.samplepractice.model.commonmodels.AbstractAuditingEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyModelCount{

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

    @Column(name = "listCount")
    private Long totalcount;

    @Column(name = "`companytype`")
    private String companyType;

    @Column(name = "`companypannumber`")
    private String companyPanNumber;
}
