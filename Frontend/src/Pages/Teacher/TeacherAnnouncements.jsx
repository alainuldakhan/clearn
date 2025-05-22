import { useEffect, useState, useContext } from "react";
import { ThemeProvider } from "../../ThemeProvider";
import "./teacherannouncements.css";
import "../../Components/EditAnnouncement/modalstyles.css";
import TeacherSideBar from "../../Components/TeacherSideBar/TeacherSideBar";
import axios from "axios";
import TeacherAnnouncementBox from "../../Components/TeacherAnnouncementBox/TeacherAnnouncementBox";
import AddAnnouncement from "../../Components/AddAnnouncement/AddAnnouncement";
import EditAnnouncement from "../../Components/EditAnnouncement/EditAnnouncement";

export default function TeacherAnnouncements() {
  const { isDarkMode, toggleTheme } = useContext(ThemeProvider);
  const [announcements, setAnnouncements] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    axios
      .get("http://localhost:3001/api/announcement")
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  };

  const handleAdd = () => {
    setShowCreate(false);
    fetchList();
  };

  const handleEdit = () => {
    setShowEdit(false);
    setCurrent(null);
    fetchList();
  };

  const onEdit = item => {
    setCurrent(item);
    setShowEdit(true);
  };

  const onDelete = id => {
    axios
      .delete(`http://localhost:3001/api/announcement/${id}`)
      .then(() => setAnnouncements(prev => prev.filter(a => a.announcement_id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <div className="teacherAnnouncements-container">
        <TeacherSideBar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <div className="announcement">
          <h1>Объявления</h1>
          <button className="create-btn" onClick={() => setShowCreate(true)}>
            Создать
          </button>
          <div className="announcementboxes">
            {announcements.length ? (
              announcements.map(a => (
                <TeacherAnnouncementBox
                  key={a.announcement_id}
                  id={a.announcement_id}
                  title={a.announcement_title}
                  content={a.announcement_content}
                  onEdit={() => onEdit(a)}
                  onDelete={() => onDelete(a.announcement_id)}
                />
              ))
            ) : (
              <p>Объявлений нет</p>
            )}
          </div>
        </div>

        {showCreate && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setShowCreate(false)}>
                ✕
              </button>
              <AddAnnouncement onSuccess={handleAdd} />
            </div>
          </div>
        )}

        {showEdit && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setShowEdit(false)}>
                ✕
              </button>
              <EditAnnouncement
                announcement={current}
                onSuccess={handleEdit}
                onCancel={() => setShowEdit(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
