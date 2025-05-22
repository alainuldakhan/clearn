import PropTypes from "prop-types";
import "./teacherannouncementbox.css";

export default function TeacherAnnouncementBox({
  id,
  title,
  content,
  onDelete,
  onEdit
}) {
  return (
    <div className="teacherannouncementbox-container">
      <div className="tawhitebox">
        <div className="taheader">
          <div className="taid">
            <h2>{id}</h2>
          </div>
          <div className="taleftside">
            <h2>{title}</h2>
          </div>
          <div className="tarightside">
            <button className="edit-btn" onClick={onEdit}>Редактировать</button>
            <button className="delete-btn" onClick={onDelete}>
              Удалить
            </button>
          </div>
        </div>
        <div className="tabody">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

TeacherAnnouncementBox.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};