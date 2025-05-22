import { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "../../ThemeProvider";
import "./coursecard.css";

export default function CourseCard({ module_code, module_name, onEdit, onDelete }) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"} className="cc">
      <div className="courcecard-container">
        <div className="whitebox">
          <div className="greenbox"></div>
          <div className="cardcontent">
            <h2>{module_code}</h2>
            <h3>{module_name}</h3>

            <div className="btns">
              <button className="delete-btn" onClick={() => onDelete(module_code)}>
                Удалить
              </button>
              <button className="edit-btn" onClick={() => onEdit(module_code)}>
                Изменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  module_code: PropTypes.string.isRequired,
  module_name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
