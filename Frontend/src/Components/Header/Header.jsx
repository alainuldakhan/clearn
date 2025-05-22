import "./header.css";
import PropTypes from "prop-types";
import NavItem from "../NavItem/NavItem";
import { Link } from "react-router-dom";

export default function Header({ onToggleTheme }) {

  return (
    <div className="header-container">
      <div className="leftSideHeader">
        <Link to={"/"}>
        </Link>
      </div>
      <div className="rightSideHeader">
        <NavItem text="Главная" url="/" />
        <NavItem text="Регистрация" url="/choosesignup" />
        <NavItem text="Вход" url="/choosesignin" />
        <button onClick={onToggleTheme}>Переключить тему</button>
      </div>
    </div>
  );
}

Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};