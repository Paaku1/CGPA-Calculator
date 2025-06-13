package org.calculator.backend.service;

import org.calculator.backend.Utils.CourseUtils;
import org.calculator.backend.model.Course;
import org.calculator.backend.model.Grade;
import org.calculator.backend.repository.CourseRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {


    private final CourseRepo courseRepo;
    private final CourseUtils courseUtils;

    public CourseService(CourseRepo courseRepo, CourseUtils courseUtils) {
        this.courseRepo = courseRepo;
        this.courseUtils = courseUtils;
    }

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public double calculateCgpa(List<Grade> grades) {
        int totalCredits = 0;
        int totalGradedPoints = 0;
        int credits = 0;
        for(Grade g : grades){
            credits = courseRepo.findCreditsByCourseCode(g.getCourseCode());
            totalCredits += credits;
            totalGradedPoints += courseUtils.getGrade(g.getGrade())*credits;
        }
        return Math.round(((double) totalGradedPoints /totalCredits)*100.0)/100.0;
    }
}
