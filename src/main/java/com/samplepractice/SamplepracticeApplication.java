package com.samplepractice;

import com.samplepractice.config.SwaggerConfig;
import com.samplepractice.config.ThymeleafConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@Import({SwaggerConfig.class, ThymeleafConfig.class})
@ComponentScan(basePackages = "com.samplepractice")
@EnableWebMvc
public class SamplepracticeApplication{

	public static void main(String[] args) {
		SpringApplication.run(SamplepracticeApplication.class, args);
		System.out.println("project started..");
	}
}
