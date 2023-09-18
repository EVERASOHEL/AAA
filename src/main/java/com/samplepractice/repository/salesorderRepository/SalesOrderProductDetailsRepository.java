package com.samplepractice.repository.salesorderRepository;

import com.samplepractice.model.salesordermodel.SalesOrderProductDetailsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SalesOrderProductDetailsRepository extends JpaRepository<SalesOrderProductDetailsModel,Long> {

    @Query(nativeQuery=true,value="select * from tbl_salesorderproductdetails where salesordercompanyid=:id")
    List<SalesOrderProductDetailsModel> findRecordProductDetailsById(Long id);

}
