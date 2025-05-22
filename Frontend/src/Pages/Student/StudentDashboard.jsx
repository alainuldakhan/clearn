import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeProvider } from "../../ThemeProvider";
import "./studentdashboard.css";
import bookimg from "../../Assets/bookimg.svg";
import filter from "../../Assets/filter.svg";
import StudentSideBar from "../../Components/StudentSideBar/StudentSideBar";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const { isDarkMode } = useContext(ThemeProvider);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Токен не найден. Авторизуйтесь.");
      return;
    }

    axios
      .get("http://localhost:3001/api/studentprofile/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setProfile(res.data.profile))
      .catch(err => setError(err.response?.data?.error || "Ошибка загрузки профиля"));
  }, []);

  if (error) return <div>Ошибка: {error}</div>;
  if (!profile) return <div>Загрузка профиля...</div>;

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <div className="studentdashboard-container">
        <StudentSideBar />
        <div className="dashboard-rightside">
          <h1>
            С возвращением, <span>{profile.StudentName}</span>
          </h1>

          <div className="motivation">
            <div className="imgs">
              <img src={bookimg} alt="book" className="book" />
              <img src={filter} alt="filter" className="filter" />
            </div>
            <div className="motitext">
              <h2>
                <span>“</span>Эксперт когда-то был новичком<span>”</span>
              </h2>
              <h3>– Хелен Хейес</h3>
            </div>
          </div>

          <div className="twocards">
            <div className="leftcard">
              <h4>Профиль</h4>
              <div className="profiledetails">
                <div className="profileitem">
                  <strong>ID студента:</strong> {profile.StudentID}
                </div>
                <div className="profileitem">
                  <strong>Имя:</strong> {profile.StudentName}
                </div>
                <div className="profileitem">
                  <strong>Email:</strong> {profile.StudentEmail || profile.email}
                </div>
                <div className="profileitem">
                  <strong>Телефон:</strong> {profile.StudentMobileNo}
                </div>
              </div>
            </div>

            <div className="rightcard">
              <div className="pp">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                  alt="avatar"
                />
              </div>
              <div className="rolecard">
                <span>Студент</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
