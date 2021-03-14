package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages = {"com.example.*"})
@EntityScan(basePackages = {"com.example.*"})
public class JavaRecordApplication {

    public static void main(String[] args) {
        SpringApplication.run(JavaRecordApplication.class, args);
    }

}
