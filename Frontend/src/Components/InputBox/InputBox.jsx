import "./inputbox.css";
import PropTypes from "prop-types";

export default function InputBox(props) {
  return (
    <>
      <div className="inputbox-container">
        <input
        name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          className=" inputbox"
          value={props.value}
          onChange={props.onChange}
        />
        <img src={props.src} className="input-icon" />
      </div>
    </>
  );
}

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
