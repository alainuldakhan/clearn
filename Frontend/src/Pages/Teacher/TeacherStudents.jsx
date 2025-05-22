import { useEffect, useState, useContext } from "react";
import { ThemeProvider } from "../../ThemeProvider";
import "./teacherstudents.css";
import "../../Components/EditStudent/modalstyles.css";
import axios from "axios";
import TeacherSideBar from "../../Components/TeacherSideBar/TeacherSideBar";
import AddStudent from "../../Components/AddStudent/AddStudent";
import EditStudent from "../../Components/EditStudent/EditStudent";

export default function TeacherStudents() {
  const { isDarkMode } = useContext(ThemeProvider);
  const [students, setStudents] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    axios
      .get("http://localhost:3001/api/student")
      .then(res => setStudents(res.data))
      .catch(err => console.error("Ошибка API:", err));
  };

  const handleAdd = () => {
    setShowCreate(false);
    loadStudents();
  };

  const handleEdit = () => {
    setShowEdit(false);
    setCurrent(null);
    loadStudents();
  };

  const onEdit = student => {
    setCurrent(student);
    setShowEdit(true);
  };

  const onDelete = id => {
    axios
      .delete(`http://localhost:3001/api/student/${id}`)
      .then(() => setStudents(prev => prev.filter(s => s.StudentID !== id)))
      .catch(err => console.error("Ошибка удаления:", err));
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <div className="teacherstudents-container">
        <TeacherSideBar />
        <div className="crud">
          <h1>Управление студентами</h1>
          <button className="create-btn" onClick={() => setShowCreate(true)}>Добавить</button>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Телефон</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {students.length ? (
                  students.map(student => (
                    <tr key={student.StudentID}>
                      <td>{student.StudentID}</td>
                      <td>{student.StudentName}</td>
                      <td>{student.StudentEmail}</td>
                      <td>{student.StudentMobileNo}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn" onClick={() => onEdit(student)}>
                            Изменить
                          </button>
                          <button className="delete-btn" onClick={() => onDelete(student.StudentID)}>
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Данные отсутствуют</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showCreate && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="cclose-btn" onClick={() => setShowCreate(false)}>✕</button>
              <AddStudent onSuccess={handleAdd} />
            </div>
          </div>
        )}

        {showEdit && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="cclose-btn" onClick={() => setShowEdit(false)}>✕</button>
              <EditStudent student={current} onSuccess={handleEdit} onCancel={() => setShowEdit(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
