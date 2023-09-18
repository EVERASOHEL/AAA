package com.samplepractice.repository.salesorderRepository;

import com.samplepractice.model.salesordermodel.SalesOrderCompanyModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesOrderCompanyRepository extends JpaRepository<SalesOrderCompanyModel,Long> {
}
