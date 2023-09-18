package com.samplepractice.model.productmodels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductModelCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "`id`")
    private Integer id;

    @Column(name = "productname")
    private String productName;

    @Column(name = "sellingprice")
    private Float sellingPrice;

    @Column(name = "costprice")
    private Float costPrice;

    @Column(name = "producthsn")
    private String productHsn;

    @Column(name = "gsttype")
    private String gstPercentage;

    @Column(name = "producttype")
    private String productType;

    @Column(name = "listCount")
    private Long totalcount;

}
