import PropTypes from "prop-types";
import "./buttonone.css";

export default function ButtonOne({ text }) {
  return (
    <div>
      <button className="btn1">{text}</button>
    </div>
  );
}

ButtonOne.propTypes = {
  text: PropTypes.string.isRequired,
};
