import { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
import EduverseLight from "../../assets/EduVerse.svg";
import EduverseDark from "../../assets/EduVerse-dark.svg";
import "./studentsidebar.css";
import { NavLink } from "react-router-dom";

export default function StudentSideBar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const logosrc = isDarkMode ? EduverseDark : EduverseLight;
  return (
    <div className="sb" data-theme={isDarkMode ? "dark" : "light"}>
      <div className="sidebar-container">
        <div className="eduverse-logo">
          <img src={logosrc} alt="logo" />
        </div>

        <div className="section-list">
          <ul>
            <li>
              <NavLink to={"/student/dashboard"}>Дэшборд</NavLink>
            </li>

            <li>
              <NavLink to={"/student/mycourses"}>Мои курсы</NavLink>
            </li>
            <li>
              <NavLink to={"/student/allcourses"}>Курсы</NavLink>
            </li>
            <li>
              <NavLink to={"/student/assignments"}>Задания</NavLink>
            </li>
            <li>
              <NavLink to={"/student/announcements"}>Объявления</NavLink>
            </li>
            <li>
              <NavLink to={"/student/settings"}>Настройки</NavLink>
            </li>
            <li>
              <button onClick={toggleTheme}>Тема</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
