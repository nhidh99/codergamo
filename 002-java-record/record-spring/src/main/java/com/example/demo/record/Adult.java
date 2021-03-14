package com.example.demo.record;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public record Adult(@JsonProperty("name") String name, @JsonProperty("age") Integer age) {
    public Adult {
        if (age < 18) {
            throw new IllegalArgumentException("Are you sure?");
        }
    }

    public static Adult fromUnknownName(Integer age) {
        return new Adult("Secret Agent Name", age);
    }
}
