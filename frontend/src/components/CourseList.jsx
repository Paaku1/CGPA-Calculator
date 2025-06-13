import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/courses/getAllCourses")
            .then((response) => {
                setCourses(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the courses!", error);
            });
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            <table>
                <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Semester</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course) => (
                    <tr key={course.courseCode}>
                        <td>{course.courseCode}</td>
                        <td>{course.courseName}</td>
                        <td>{course.credits}</td>
                        <td>{course.semester}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;