package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Employee;

/**
 * Spring Data JPA writes the implementation for you.
 * You get save(), findAll(), findById(), deleteById(), existsById() and more for free.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
