package org.calculator.backend.controller;

import org.calculator.backend.model.Course;
import org.calculator.backend.model.Grade;
import org.calculator.backend.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/courses")
class CourseController {

    private final CourseService courseService;

    CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/getAllCourses")
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PostMapping("/calculate-cgpa")
    public double calculateCgpa(@RequestBody List<Grade> grades) {
        return courseService.calculateCgpa(grades);
    }


}
