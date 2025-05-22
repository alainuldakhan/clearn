import { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
import "./choose.css";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";

export default function ChooseSignUp() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <div className="choose-container">
        <div className="choose-text">Зарегистрироваться в C-learn как:</div>
        <div className="choose-buttons">
          <div className="teacherbtn">
            <Link to="/teachersignup">
              <div className="choose-box">
                <img src="src/assets/teacher.png" alt="Преподаватель" />
              </div>
            </Link>
            <h2>Преподаватель</h2>
          </div>

          <div className="studentbtn">
            <Link to="/studentsignup">
              <div className="choose-box">
                <img src="src/assets/student.png" alt="Студент" />
              </div>
            </Link>
            <h2>Студент</h2>
          </div>
        </div>
      </div>
    </div>
  );
}