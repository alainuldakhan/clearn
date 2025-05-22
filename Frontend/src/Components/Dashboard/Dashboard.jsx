import "./dashboard.css";
import searchicon from "../../assets/search.png";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="search-box">
          <img src={searchicon} alt="Поиск" />
          <input type="text" placeholder="Поиск..." />
        </div>

        <div className="profile-box">
          <div className="left-side-profile-box">
            <div className="regnoandrole">
              <div className="reg-no">C/2024/0001</div>
              <div className="role">Студент</div>
            </div>
            <div className="full-name">Имя Фамилия</div>
          </div>

          <div className="right-side-profile-box">
            <div className="dp">
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                alt="Аватар"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
