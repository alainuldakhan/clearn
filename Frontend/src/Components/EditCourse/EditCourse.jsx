import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import "./editcourse.css";
import "./modalstyles.css";

export default function EditCourse({ course, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    module_code: course.module_code,
    module_name: course.module_name,
  });

  useEffect(() => {
    setFormData({
      module_code: course.module_code,
      module_name: course.module_name,
    });
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    console.log("Отправление данных:", formData);
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/module/${course.module_code}`,
        formData
      );
      if (response.status === 200) {
        setMessage({ text: "Курс был успешно обновлен!", type: "success" });
        setTimeout(() => onSuccess(), 1500);
      } else {
        throw new Error("Неожиданная ошибка от сервера");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage({
        text: err.response?.data?.message || "Ошибка при обновлении курса",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-course-form">
      <h2>Редактировать курс</h2>
      <form onSubmit={handleEdit}>
        <InputWithLabel
          type="number"
          label="Course Code"
          name="module_code"
          value={formData.module_code}
          onChange={handleChange}
          disabled
        />
        <InputWithLabel
          type="text"
          label="Course Name"
          name="module_name"
          value={formData.module_name}
          onChange={handleChange}
        />
        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </div>
      </form>
    </div>
  );
}

EditCourse.propTypes = {
  course: PropTypes.shape({
    module_code: PropTypes.number.isRequired,
    module_name: PropTypes.string.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
};
