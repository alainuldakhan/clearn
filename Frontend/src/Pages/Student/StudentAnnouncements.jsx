import { useState, useEffect, useContext } from "react";
import { ThemeProvider } from "../../ThemeProvider";
import "./studentannouncements.css";
import axios from "axios";
import StudentAnnouncementBox from "../../Components/StudentAnnouncementBox/StudentAnnouncementBox";
import StudentSideBar from "../../Components/StudentSideBar/StudentSideBar";

export default function StudentAnnouncements() {
  const { isDarkMode, toggleTheme } = useContext(ThemeProvider);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = () => {
    axios
      .get("http://localhost:3001/api/announcement")
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error("Ошибка API:", err));
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <div className="studentAnnounsments-container">
        <StudentSideBar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <div className="announcement">
          <h1>Объявления</h1>

          <div className="announcementboxes">
            {announcements.length ? (
              announcements.map(a => (
                <StudentAnnouncementBox
                  key={a.announcement_id}
                  id={a.announcement_id}
                  title={a.announcement_title}
                  content={a.announcement_content}
                />
              ))
            ) : (
              <p>Объявлений нет</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
