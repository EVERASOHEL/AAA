package com.samplepractice.exception;

public class InvoiceCreationException extends RuntimeException {

    public InvoiceCreationException() {
        super();
    }

    public InvoiceCreationException(String message) {
        super(message);
    }

    public InvoiceCreationException(String message, Throwable cause) {
        super(message, cause);
    }

    // Add any additional constructors or methods if needed
}

