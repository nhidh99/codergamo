package com.example.demo.controller;

import com.example.demo.record.Adult;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/adult")
public class AdultValidateController {
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> validateAdult(@RequestBody Adult adult) {
        System.out.println("New guest: " + adult.toString());
        return ResponseEntity.ok().body("Welcome, " + adult.name() + "!");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> faultAdultHandler(IllegalArgumentException e) {
        System.out.println("New kid!");
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
