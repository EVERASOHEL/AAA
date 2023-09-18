package com.samplepractice.model;

import com.samplepractice.dto.salesorderdto.SalesOrderCompanyDTO;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

import java.util.List;

public class CustomDataSource implements JRDataSource {

    private List<SalesOrderCompanyDTO> data; // Replace with your actual data type
    private int currentIndex = -1;

    public CustomDataSource(List<SalesOrderCompanyDTO> data) {
        this.data = data;
    }

    @Override
    public boolean next() throws JRException {
        currentIndex++;
        return currentIndex < data.size();
    }

    @Override
    public Object getFieldValue(JRField jrField) throws JRException {
        return null;
    }
}
