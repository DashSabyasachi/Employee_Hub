package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.EmployeeRequest;
import com.example.demo.dto.EmployeeResponse;

public interface EmployeeService {

    List<EmployeeResponse> getAll();

    EmployeeResponse getById(Long id);

    EmployeeResponse create(EmployeeRequest request);

    void delete(Long id);
}
