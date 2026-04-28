package com.student.service;

import com.student.entity.Student;
import com.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repo;

    // CRUD
    public Student save(Student s) {
        return repo.save(s);
    }

    public List<Student> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    // Search
    public List<Student> searchByName(String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }

    // Filter
    public List<Student> filterByMarks(double min, double max) {
        return repo.findByMarksBetween(min, max);
    }

    // Pagination
    public Page<Student> getPage(Pageable pageable) {
        return repo.findAll(pageable);
    }

    // Analytics
    public List<Object[]> getDeptCount() {
        return repo.countByDepartment();
    }

    public Double getAverageMarks() {
        return repo.averageMarks();
    }
}