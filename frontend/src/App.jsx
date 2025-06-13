import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CourseList from "./components/CourseList";

function App() {
    return (
        <Router>
            <Routes>
                {/* Example routes */}
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<CourseList />} />
            </Routes>
        </Router>
    );
}

export default App;
