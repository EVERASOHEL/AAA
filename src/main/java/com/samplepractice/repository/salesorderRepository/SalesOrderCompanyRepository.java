package com.samplepractice.repository.salesorderRepository;

import com.samplepractice.model.salesordermodel.SalesOrderCompanyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

public interface SalesOrderCompanyRepository extends JpaRepository<SalesOrderCompanyModel,Long> {

    @Query(nativeQuery=true,value="SELECT s.voucherno\n" +
            "FROM tbl_salesordercompany s\n" +
            "JOIN company c ON s.companyname = c.companyname\n" +
            "WHERE c.companytype =:companyType\n" +
            "ORDER BY s.voucherno DESC\n" +
            "LIMIT 1")
    Long findMaxVoucherNoByCompanyType(@Param("companyType") String companyType);

    @Query(nativeQuery = true, value = "SELECT * FROM get_voucher_info(" +
            "CASE WHEN :companyType IS NULL THEN NULL ELSE CAST(:companyType AS text) END, " +
            "CASE WHEN :voucherNo IS NULL THEN NULL ELSE CAST(:voucherNo AS text) END)")
    String getLastVoucherNo(@Param("companyType") String companyType, @Param("voucherNo") String voucherNo);

}
