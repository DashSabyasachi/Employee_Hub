package com.example.demo.dto;

import java.math.BigDecimal;

/** Data the server sends back to the client. */
public record EmployeeResponse(Long id, String name, BigDecimal salary) {
}
