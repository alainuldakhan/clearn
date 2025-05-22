import { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
import EduverseLight from "../../assets/EduVerse.svg";
import EduverseDark from "../../assets/EduVerse-dark.svg";
import "./teachersidebar.css";
import {  NavLink } from "react-router-dom";

export default function TeacherSideBar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const logoSrc = isDarkMode ? EduverseDark : EduverseLight;

  return (
    <div  data-theme={isDarkMode ? "dark" : "light"}>
      <div className="sidebar-container">
        <div className="eduverse-logo">
          <img src={logoSrc} alt="logo" />
        </div>

        <div className="section-list">
          <ul>
            <li>
              <NavLink to="/teacher/dashboard">Дэшборд</NavLink>
            </li>
            <li>
              <NavLink to="/teacher/courses">Курсы</NavLink>
            </li>
            <li>
              <NavLink to="/teacher/assignments">Задания</NavLink>
            </li>
            <li>
              <NavLink to="/teacher/announcements">Объявления</NavLink>
            </li>
            <li>
              <NavLink to="/teacher/students">Студенты</NavLink>
            </li>
            <li>
              <NavLink to="/teacher/settings">Настройки</NavLink>
            </li>
            <li>
              <button onClick={toggleTheme}>Tема</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
