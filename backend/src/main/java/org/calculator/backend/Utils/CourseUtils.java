package org.calculator.backend.Utils;

import org.springframework.stereotype.Component;

@Component
public class CourseUtils {

    public int getGrade(String grade) {
        return switch(grade){
            case "O" -> 10;
            case "A+" -> 9;
            case "A" -> 8;
            case "B+" -> 7;
            case "B" -> 6;
            case "C" -> 5;
            default -> throw new IllegalStateException("Unexpected value: " + grade);
        };
    }
}
