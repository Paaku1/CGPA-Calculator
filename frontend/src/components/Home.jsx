import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SemesterSelect = ({ semester, handleSelectChange }) => (
    <div className="form-group">
        <label>Semester</label>
        <select
            id="sem_id"
            className="form-control"
            value={semester}
            onChange={handleSelectChange}
        >
            <option value="">-- Select an option --</option>
            {[...Array(8).keys()].map((i) => (
                <option key={i} value={i + 1}>
                    {i + 1}
                </option>
            ))}
        </select>
    </div>
);

const CourseTable = ({ selectedSemesterData, handleGradeChange }) => (
    <div className="mt-5">
        <h2>{selectedSemesterData.semesterTitle}</h2>
        <table className="table table-bordered mt-3">
            <thead>
            <tr>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Credit</th>
                <th>Grade</th>
            </tr>
            </thead>
            <tbody>
            {selectedSemesterData.rows.map((row, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.code}</td>
                    <td>{row.title}</td>
                    <td>{row.credit}</td>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={row.grade}
                            onChange={(e) =>
                                handleGradeChange(
                                    selectedSemesterData.semesterTitle,
                                    index,
                                    e.target.value
                                )
                            }
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

function Home() {
    const [semester, setSemester] = useState("");
    const [showTables, setShowTables] = useState(false);
    const [cgpa, setCgpa] = useState(null);
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/courses/getAllCourses")
            .then((response) => {
                const grouped = response.data.reduce((acc, course) => {
                    const semesterTitle = `Semester ${course.semester}`;
                    if (!acc[semesterTitle]) acc[semesterTitle] = [];
                    acc[semesterTitle].push({
                        code: course.courseCode,
                        title: course.courseName,
                        credit: course.credits,
                        grade: "", // initialize empty grade field
                    });
                    return acc;
                }, {});
                const formatted = Object.entries(grouped).map(
                    ([semesterTitle, rows]) => ({
                        semesterTitle,
                        rows,
                    })
                );
                setCourseData(formatted);
            })
            .catch((err) => {
                console.error("Failed to fetch courses", err);
            });
    }, []);

    const handleSelectChange = (event) => {
        setSemester(event.target.value);
        setShowTables(false);
    };

    const handleGradeChange = (semesterTitle, index, grade) => {
        setCourseData((prevCourseData) => {
            const updatedData = [...prevCourseData];
            const semesterIndex = updatedData.findIndex(
                (s) => s.semesterTitle === semesterTitle
            );
            if (semesterIndex !== -1) {
                updatedData[semesterIndex].rows[index].grade = grade;
            }
            return updatedData;
        });
    };

    const handleShowCoursesClick = () => {
        setShowTables(true);
    };

    const handleCalculateClick = async () => {
        // Collect all grades entered
        const gradesToSend = courseData.flatMap((sem) =>
            sem.rows
                .filter((row) => row.grade.trim() !== "")
                .map((row) => ({
                    courseCode: row.code,
                    grade: row.grade.trim().toUpperCase(), // normalize grade
                }))
        );

        try {
            const response = await axios.post(
                "http://localhost:5000/courses/calculate-cgpa",
                gradesToSend
            );
            console.log("GPA/CGPA response:", response);
            setCgpa(response.data);
        } catch (error) {
            console.error("Error calculating GPA and CGPA:", error);
        }
    };

    const selectedSemesterData = useMemo(() => {
        if (!semester) return [];
        return courseData.filter(
            (data) => parseInt(data.semesterTitle.split(" ")[1]) <= parseInt(semester)
        );
    }, [semester, courseData]);

    return (
        <div className="container mt-5">
            <h1>CGPA Calculator</h1>
            <div className="row">
                <div className="col-md-12">
                    <SemesterSelect
                        semester={semester}
                        handleSelectChange={handleSelectChange}
                    />
                </div>
            </div>

            <div className="mt-3">
                <button
                    className="btn btn-secondary mt-2"
                    onClick={handleShowCoursesClick}
                >
                    Show Courses
                </button>

                <br />
                <Link
                    to="/courses"
                    className="btn btn-outline-primary mt-2"
                    target="_blank"
                >
                    Go to Course List
                </Link>
            </div>

            {showTables &&
                selectedSemesterData.map((semesterData, index) => (
                    <CourseTable
                        key={index}
                        selectedSemesterData={semesterData}
                        handleGradeChange={handleGradeChange}
                    />
                ))}
            <button
                className="btn btn-primary mt-2 ml-2"
                onClick={handleCalculateClick}
            >
                Calculate GPA/CGPA
            </button>
            {cgpa !== null && (
                <div className="alert alert-success mt-4">
                    <strong>CGPA:</strong> {cgpa}
                </div>
            )}
        </div>
    );
}

export default Home;
