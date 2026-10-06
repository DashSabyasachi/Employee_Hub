package com.example.demo.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

/** Data the client sends when creating an employee. */
public record EmployeeRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 100, message = "Name can be at most 100 characters")
        String name,

        @NotNull(message = "Salary is required")
        @PositiveOrZero(message = "Salary can't be negative")
        BigDecimal salary) {
}
