import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./navitem.css";

export default function NavItem(props) {
  return (
    <div className="navItem-container">
      <NavLink
        to={props.url}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        {props.text}
      </NavLink>
    </div>
  );
}

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
