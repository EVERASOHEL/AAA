package com.samplepractice.serviceimplementation.whatsAppServiceImpl;

import com.samplepractice.services.whatsAppService.WhatsAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.internet.MimeMessage;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class WhatsAppServiceImpl implements WhatsAppService {
    @Override
    public String sendPdf() {
        return null;
    }

//    @Autowired
//    private WhatsAppService whatsAppService;
//
//    @Autowired
//    private WhatsAppConfig whatsAppConfig;
//
//    @Override
//    public String sendPdf() {
//
//        String recipientEmail = "everasohel@gmail.com"; // Replace with actual recipient email
//        String subject = "Sales Invoice";
//        String message = "hello";
//        Path pdfPath = Paths.get("D:\\Vexon Pdf\\Purchase pdf\\Vexon\\01 - Vexon.pdf"); // Replace with actual PDF path
//
//        try {
//            byte[] pdfBytes = Files.readAllBytes(pdfPath);
//
//            // Set up JavaMailSender
//            JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//            mailSender.setHost("your-smtp-host");
//            mailSender.setPort(587);
//            mailSender.setUsername("your-email@example.com");
//            mailSender.setPassword("your-email-password");
//
//            // Set up MimeMessage
//            MimeMessage mimeMessage = mailSender.createMimeMessage();
//            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
//            helper.setFrom("your-email@example.com");
//            helper.setTo(recipientEmail);
//            helper.setSubject(subject);
//            helper.setText(message);
//
//            // Attach PDF file
//            ByteArrayResource pdfAttachment = new ByteArrayResource(pdfBytes);
//            helper.addAttachment("document.pdf", pdfAttachment);
//
//            // Send the email
//            mailSender.send(mimeMessage);
//
//            return "Email sent successfully"; // Return success message
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Failed to send email"; // Return failure message
//        }
//    }


}
