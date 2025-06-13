package org.calculator.backend.repository;

import org.calculator.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CourseRepo extends JpaRepository<Course, String> {

    @Query("select c.credits from Course c where c.courseCode = :courseCode")
    int findCreditsByCourseCode(String courseCode);

}
