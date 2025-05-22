import "./studentannouncementbox.css";
import PropTypes from "prop-types";

export default function StudentAnnouncementBox(props) {
  return (
    <div className="studentannouncementbox-container">
      <div className="sawhitebox">
        <div className="saheader">
          <h2>{props.title}</h2>
        </div>
        <div className="sabody">
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
}

StudentAnnouncementBox.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};