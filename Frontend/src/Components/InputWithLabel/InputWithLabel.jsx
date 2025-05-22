import PropTypes from "prop-types";
import "./inputwithlabel.css";
export default function InputWithLabel(props) {
  return (
    <div className="inputwithlabel-container">
      <label>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="add-std-inputbox"
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        
      />
    </div>
  );
}

InputWithLabel.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
