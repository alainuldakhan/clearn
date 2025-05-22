import { useEffect, useContext, useState } from "react";
import { ThemeProvider } from "../../ThemeProvider";
import "./studentallcourses.css";
import axios from "axios";
import SideBar from "../../Components/StudentSideBar/StudentSideBar";
import StudentCourseCard from "../../Components/StudentCourseCard/StudentCourseCard";

export default function StudentAllCourses() {
  const { isDarkMode } = useContext(ThemeProvider);
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  const enrollInCourse = (code) => {
    setEnrolled(prev => [...prev, code]);
  };

  const isEnrolled = (code) => enrolled.includes(code);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    axios
      .get("http://localhost:3001/api/module")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Ошибка API:", err));
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <div className="studentallcourses-container">
        <SideBar />
        <div className="studentallcourses">
          <h1>Все курсы</h1>
          <div className="allcards">
            {courses.length ? (
              courses.map(mod => (
                <StudentCourseCard
                  key={mod.module_code}
                  module_code={mod.module_code}
                  module_name={mod.module_name}
                  onEnroll={() => enrollInCourse(mod.module_code)}
                  isEnrolled={isEnrolled(mod.module_code)}
                />
              ))
            ) : (
              <h2>Курсы отсутствуют</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}