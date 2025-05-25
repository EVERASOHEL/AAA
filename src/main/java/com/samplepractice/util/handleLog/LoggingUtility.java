package com.samplepractice.util.handleLog;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.function.Supplier;

@Component
public class LoggingUtility {

    private static final Logger logger = LoggerFactory.getLogger(LoggingUtility.class);

    public void logAndExecute(String message, Runnable operation) {
        logger.info(message);
        operation.run();
    }

    public <T> T logAndExecute(String message, Supplier<T> operation) {
        logger.info(message);
        return operation.get();
    }

}
