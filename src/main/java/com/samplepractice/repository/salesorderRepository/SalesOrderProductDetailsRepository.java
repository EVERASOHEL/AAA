package com.samplepractice.repository.salesorderRepository;

import com.samplepractice.model.salesordermodel.SalesOrderProductDetailsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SalesOrderProductDetailsRepository extends JpaRepository<SalesOrderProductDetailsModel, Long> {

    @Query(nativeQuery = true, value = "select * from tbl_salesorderproductdetails where salesordercompanyid=:id")
    List<SalesOrderProductDetailsModel> findRecordProductDetailsById(@Param("id") Long id);

    @Query("SELECT s FROM SalesOrderProductDetailsModel s WHERE s.salesOrderCompanyId = :id ORDER BY s.productName")
    List<SalesOrderProductDetailsModel> findSalesOrderProductDetailsModelByIdOrderByProductName(@Param("id") Long id);

//    @Transactional(readOnly = true)
//    List<SalesOrderProductDetailsModel> findRecordProductDetailsById(Long id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM tbl_salesorderproductdetails WHERE salesordercompanyid=:salesOrderCompanyId", nativeQuery = true)
    void deleteProductsBySalesOrderId(@Param("salesOrderCompanyId") Long salesOrderCompanyId);

}
