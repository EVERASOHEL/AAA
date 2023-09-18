package com.samplepractice.repository.paymentRepository;

import com.samplepractice.dto.paymentdto.PaymentReceivablesOrPayables;
import com.samplepractice.model.paymentmodels.PaymentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentModel,Long> {

    @Query(nativeQuery = true,value="select * from tbl_vendor_payment where orderid=:orderId")
    List<PaymentModel> getPaymentHistoryByOrderId(Long orderId);

}
