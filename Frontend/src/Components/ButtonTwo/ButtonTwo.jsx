import PropTypes from "prop-types";
import "./buttontwo.css";

export default function ButtonTwo({ text }) {
  return (
    <div>
      <button className="btn2">{text}</button>
    </div>
  );
}

ButtonTwo.propTypes = {
  text: PropTypes.string.isRequired,
};
