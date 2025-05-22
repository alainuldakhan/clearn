import "./modal.css";
import PropTypes from "prop-types";

export default function Modal({ isOpen, onClose, student }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Детали студента</h2>
        <p>ID: {student.StudentID}</p>
        <p>Имя: {student.StudentName}</p>
        <p>Email: {student.StudentEmail}</p>
        <p>Телефон: {student.StudentMobileNo}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.shape({
    StudentID: PropTypes.string.isRequired,
    StudentName: PropTypes.string.isRequired,
    StudentEmail: PropTypes.string.isRequired,
    StudentMobileNo: PropTypes.string.isRequired,
  }).isRequired,
};
