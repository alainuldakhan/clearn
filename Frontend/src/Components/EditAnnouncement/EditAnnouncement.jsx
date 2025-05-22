import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import "./editannouncement.css";
import "./modalstyles.css";

export default function EditAnnouncement({ announcement, onSuccess }) {
  const [formData, setFormData] = useState({
    announcement_title: announcement.announcement_title,
    announcement_content: announcement.announcement_content,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      announcement_title: announcement.announcement_title,
      announcement_content: announcement.announcement_content,
    });
  }, [announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:3001/api/announcement/${announcement.announcement_id}`, formData);
      setMessage({ text: "Объявление успешно обновлено!", type: "success" });
      setTimeout(() => onSuccess(), 1500);
    } catch (err) {
      console.error("Ошибка данных:", err.response?.data);
      console.error("Код ошибки:", err.response?.status);
      setMessage({
        text: err.response?.data?.message || "Ошибка при обновлении объявления",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-announcement-form">
      <h2>Редактировать объявление</h2>
      <form onSubmit={handleEdit}>
        <InputWithLabel
          type="text"
          label="Заголовок:"
          name="announcement_title"
          value={formData.announcement_title}
          onChange={handleChange}
          required
        />
        <InputWithLabel
          type="text"
          label="Содержание:"
          name="announcement_content"
          value={formData.announcement_content}
          onChange={handleChange}
          required
        />
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Обновление..." : "Сохранить изменения"}
          </button>
        </div>
      </form>
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
    </div>
  );
}

EditAnnouncement.propTypes = {
  announcement: PropTypes.shape({
    announcement_id: PropTypes.number.isRequired,
    announcement_title: PropTypes.string.isRequired,
    announcement_content: PropTypes.string.isRequired,
  }).isRequired,
  onSuccess: PropTypes.func.isRequired,
};