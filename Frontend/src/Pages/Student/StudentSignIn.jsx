import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import InputBox from "../../Components/InputBox/InputBox";
import { ThemeContext } from "../../ThemeProvider";
import "./studentsignin.css";
import loginimg from "../../assets/login.svg";
import axios from "axios";

export default function StudentSignIn() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  const validateForm = () => {
    if (!values.email || !values.password) {
      setError("Все поля обязательны для заполнения");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/auth/studentsignin", values);
      if (response.data.message) {
        localStorage.setItem("token", response.data.token);
        alert("Вход выполнен успешно");
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setError("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <div className="signin-container">
        <div className="signin-leftside">
          <img src={loginimg} alt="login" />
        </div>

        <div className="signin-rightside">
          <div className="signin-title">
            <h1>
              <span>Студент</span> 
            </h1>
            <br></br>
            <h2>Введите email и пароль</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="signin-input">
              <InputBox
                type="email"
                value={values.email}
                name="email"
                placeholder="Email"
                src="src/assets/email.png"
                onChange={handleChange}
              />
              <InputBox
                type="password"
                value={values.password}
                name="password"
                placeholder="Пароль"
                src="src/assets/password.png"
                onChange={handleChange}
              />
            </div>
            <button className="signin-btn" disabled={loading}>
              Войти
            </button>
          </form>

          <p className="linktosignup">
            Нет аккаунта? <span><Link to="/studentsignup">Зарегистрироваться</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
}