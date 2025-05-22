import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./studentprofile.css";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Токен:", token);

    if (!token) {
      setError("Токен был не найден. Пожалуйста, войдите в систему.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://localhost:3001/api/studentprofile/profile", config)
      .then((response) => {
        console.log("Ответ:", response.data);

        setProfile(response.data.profile);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.error || "Ошибка при получении профиля");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="student-profile-container">
      <h2 className="student-profile-title">Student Profile</h2>
      <div className="student-profile-item">
        <strong>ID аутентификации:</strong> {profile.auth_id}
      </div>
      <div className="student-profile-item">
        <strong>ID студента:</strong> {profile.StudentID}
      </div>
      <div className="student-profile-item">
        <strong>Имя:</strong> {profile.StudentName}
      </div>
      <div className="student-profile-item">
        <strong>Email:</strong> {profile.StudentEmail || profile.email}
      </div>
      <div className="student-profile-item">
        <strong>Мобильный номер:</strong> {profile.StudentMobileNo}
      </div>
      <div className="student-profile-item">
        <strong>Создан:</strong> {profile.created_at}
      </div>
    </div>
  );
}

StudentProfile.propTypes = {
  auth_id: PropTypes.string,
  StudentID: PropTypes.string,
  StudentName: PropTypes.string,
  StudentEmail: PropTypes.string,
  StudentMobileNo: PropTypes.string,
  created_at: PropTypes.string,
};