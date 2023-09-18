package com.samplepractice.repository.paymentRepository;

import com.samplepractice.model.paymentmodels.PaymentHistoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentHistoryRepository extends JpaRepository<PaymentHistoryModel,Long> {
}
