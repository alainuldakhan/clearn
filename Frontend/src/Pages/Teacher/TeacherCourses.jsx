import { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "../../ThemeProvider";
import "./teachercourses.css";
import "../../Components/EditCourse/modalstyles.css";
import TeacherSideBar from "../../Components/TeacherSideBar/TeacherSideBar";
import CourseCard from "../../Components/CourseCard/CourseCard";
import AddCourse from "../../Components/AddCourse/AddCourse";
import EditCourse from "../../Components/EditCourse/EditCourse";
import axios from "axios";

export default function TeacherCourses() {
  const { isDarkMode, toggleTheme } = useContext(ThemeProvider);
  const [courses, setCourses] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    axios
      .get("http://localhost:3001/api/module")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Ошибка API:", err));
  };

  const handleAdd = () => {
    setShowCreate(false);
    loadCourses();
  };

  const handleEdit = () => {
    setShowEdit(false);
    setCurrent(null);
    loadCourses();
  };

  const onEdit = (course) => {
    setCurrent(course);
    setShowEdit(true);
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/module/${id}`)
      .then(() => setCourses(prev => prev.filter(c => c.module_code !== id)))
      .catch(err => console.error("Ошибка при удалении:", err));
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <div className="teachercourses-container">
        <TeacherSideBar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <div className="teachercourses">
          <h1>Курсы</h1>
          <button className="create-btn" onClick={() => setShowCreate(true)}>
            Добавить курс
          </button>
          <div className="allcards">
            {courses.length ? (
              courses.map(course => (
                <CourseCard
                  key={course.module_code}
                  module_code={course.module_code}
                  module_name={course.module_name}
                  onEdit={() => onEdit(course)}
                  onDelete={() => onDelete(course.module_code)}
                />
              ))
            ) : (
              <p>Нет доступных курсов</p>
            )}
          </div>
        </div>

        {showCreate && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setShowCreate(false)}>
                ✕
              </button>
              <AddCourse onSuccess={handleAdd} />
            </div>
          </div>
        )}

        {showEdit && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setShowEdit(false)}>
                ✕
              </button>
              <EditCourse
                course={current}
                onSuccess={handleEdit}
                onCancel={() => setShowEdit(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}