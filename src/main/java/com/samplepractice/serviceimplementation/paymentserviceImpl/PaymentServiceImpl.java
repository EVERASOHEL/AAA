package com.samplepractice.serviceimplementation.paymentserviceImpl;

import com.samplepractice.dto.paymentdto.PaymentDTO;
import com.samplepractice.dto.paymentdto.PaymentReceivablesOrPayables;
import com.samplepractice.model.paymentmodels.PaymentHistoryModel;
import com.samplepractice.model.paymentmodels.PaymentModel;
import com.samplepractice.repository.paymentRepository.PaymentHistoryRepository;
import com.samplepractice.repository.paymentRepository.PaymentRepository;
import com.samplepractice.services.paymentservice.PaymentService;
import com.samplepractice.validator.CommonValidatorAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentHistoryRepository paymentHistoryRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public String saveVendorPaymentAmount(PaymentDTO paymentDTO) throws Exception {

        PaymentValidation(paymentDTO);

        PaymentModel paymentModel = paymentRepository.save(new PaymentModel(paymentDTO));
        paymentHistoryRepository.save(new PaymentHistoryModel(paymentDTO, paymentModel.getId()));
        return "Payment Successfully Added.";
    }

    void PaymentValidation(PaymentDTO paymentDTO) throws Exception {
        CommonValidatorAppException.stringsIsNullOrEmpty("Company Name", paymentDTO.getCompanyName());
        CommonValidatorAppException.objectsIsNullAndIsDigit("Pay Amount", paymentDTO.getPayAmount());
        CommonValidatorAppException.stringsIsNullOrEmpty("Payment Date", paymentDTO.getPaymentDate().toString());
    }

    @Override
    public List<PaymentDTO> getHistoryofpaymentbyorderId(Long orderId) {
        List<PaymentModel> historyData = paymentRepository.getPaymentHistoryByOrderId(orderId);
        if (historyData.isEmpty()) {
            return new ArrayList<>();
        }
        return historyData.stream().map(PaymentDTO::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<PaymentReceivablesOrPayables> gettotalPaymentCalculation() {

        String queryString = "SELECT SUM(TotalAmount) AS TotalAmount,SUM(PayableAmount) AS PayableAmount FROM" +
                " (SELECT sc.companyname,SUM(sc.totaltaxableamount) AS TotalAmount,0 AS PayableAmount FROM" +
                " tbl_salesordercompany sc WHERE sc.companyname IN (SELECT c.companyname FROM company c" +
                " WHERE c.companytype =:companyType) GROUP BY sc.companyname UNION ALL" +
                " SELECT vp.companyname,0 AS TotalAmount,SUM(vp.payamount) AS PayableAmount" +
                " FROM tbl_vendor_payment vp WHERE vp.companyname IN (SELECT c.companyname FROM company c" +
                " WHERE c.companytype =:companyType) GROUP BY vp.companyname) AS mergedData GROUP BY companyname";

        Query vendorquery = entityManager.createNativeQuery(queryString);
        vendorquery.setParameter("companyType", "Vendor");

        Query customerquery = entityManager.createNativeQuery(queryString);
        customerquery.setParameter("companyType", "Customer");

        List<Object[]> vendorAmountlist = vendorquery.getResultList();
        List<Object[]> CustomerAmountlist = customerquery.getResultList();

        List<PaymentReceivablesOrPayables> payablesList = new ArrayList<>();
        List<PaymentReceivablesOrPayables> receivableList = new ArrayList<>();

        vendorAmountlist.forEach(list -> payablesList.add(new PaymentReceivablesOrPayables((Object[]) list)));
        CustomerAmountlist.forEach(list -> receivableList.add(new PaymentReceivablesOrPayables((Object[]) list)));

        List<PaymentReceivablesOrPayables> payablesAndreceivableList = new ArrayList<>();

        payablesAndreceivableList.add(
                new PaymentReceivablesOrPayables(
                        "Vendor",
                        payablesList.stream().mapToDouble(PaymentReceivablesOrPayables::getTotalAmount).sum(),
                        payablesList.stream().mapToDouble(PaymentReceivablesOrPayables::getTotalReceivableOrPayable).sum()
                )
        );

        payablesAndreceivableList.add(
                new PaymentReceivablesOrPayables(
                        "Customer",
                        receivableList.stream().mapToDouble(PaymentReceivablesOrPayables::getTotalAmount).sum(),
                        receivableList.stream().mapToDouble(PaymentReceivablesOrPayables::getTotalReceivableOrPayable).sum()
                )
        );

        return payablesAndreceivableList;
    }
}
