import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./editstudent.css";
import "./modalstyles.css";
import axios from "axios";
import InputWithLabel from "../InputWithLabel/InputWithLabel";

export default function EditStudent({ student, onSuccess }) {
  const [formData, setFormData] = useState({
    name: student.StudentName,
    email: student.StudentEmail,
    mobile: student.StudentMobileNo,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      name: student.StudentName,
      email: student.StudentEmail,
      mobile: student.StudentMobileNo,
    });
  }, [student]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      await axios.put(
        `http://localhost:3001/api/student/${student.StudentID}`,
        formData
      );
      setMessage({ text: "Студент успешно обновлён", type: "success" });
      setTimeout(onSuccess, 1500);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Ошибка при обновлении студента",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-student-form">
      <h2>Редактировать студента</h2>
      <form onSubmit={handleEdit} noValidate>
        <InputWithLabel
          type="text"
          label="Имя студента"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <InputWithLabel
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputWithLabel
          type="tel"
          label="Телефон"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </form>
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
    </div>
  );
}

EditStudent.propTypes = {
  student: PropTypes.shape({
    StudentID: PropTypes.number.isRequired,
    StudentName: PropTypes.string.isRequired,
    StudentEmail: PropTypes.string.isRequired,
    StudentMobileNo: PropTypes.string.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
};
