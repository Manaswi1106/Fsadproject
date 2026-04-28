package com.student.controller;

import com.student.entity.Student;
import com.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService service;

    // CREATE
    @PostMapping
    public Student add(@RequestBody Student s) {
        return service.save(s);
    }

    // READ
    @GetMapping
    public List<Student> getAll() {
        return service.getAll();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // SEARCH
    @GetMapping("/search")
    public List<Student> search(@RequestParam String name) {
        return service.searchByName(name);
    }

    // FILTER
    @GetMapping("/filter")
    public List<Student> filter(@RequestParam double min, @RequestParam double max) {
        return service.filterByMarks(min, max);
    }

    // PAGINATION
    @GetMapping("/page")
    public Page<Student> getPage(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("marks").descending());
        return service.getPage(pageable);
    }

    // ANALYTICS
    @GetMapping("/analytics/departments")
    public List<Object[]> deptCount() {
        return service.getDeptCount();
    }

    @GetMapping("/analytics/average")
    public Double avgMarks() {
        return service.getAverageMarks();
    }
}