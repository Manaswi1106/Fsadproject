package com.student.repository;

import com.student.entity.Student;
import org.springframework.data.jpa.repository.*;
import java.util.*;

public interface StudentRepository extends JpaRepository<Student, Long> {

    // Search
    List<Student> findByNameContainingIgnoreCase(String name);

    // Filter
    List<Student> findByMarksBetween(double min, double max);

    // Analytics
    @Query("SELECT s.department, COUNT(s) FROM Student s GROUP BY s.department")
    List<Object[]> countByDepartment();

    @Query("SELECT AVG(s.marks) FROM Student s")
    Double averageMarks();
}