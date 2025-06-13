package org.calculator.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Course {
    @Id
    private String courseCode;
    private String courseName;
    private int credits;
    private int semester;
}
