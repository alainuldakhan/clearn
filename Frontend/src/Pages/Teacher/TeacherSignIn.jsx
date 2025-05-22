import { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeProvider";
import Header from "../../Components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../../Components/InputBox/InputBox";
import "./teachersignin.css";
import loginimg from "../../assets/login.svg";
import axios from "axios";

export default function TeacherSignIn() {
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
      const res = await axios.post("http://localhost:3001/api/auth/teachersignin", values);
      if (res.data.message) {
        localStorage.setItem("token", res.data.token);
        alert("Успешный вход");
        navigate("/teacher/dashboard");
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
              <span>Преподаватель</span>
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
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Пароль"
                src="src/assets/password.png"
              />
            </div>
            <button className="signin-btn" disabled={loading}>Войти</button>
          </form>

          <p className="linktosignup">
            Нет аккаунта? <span><Link to="/teachersignup">Зарегистрироваться</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
}
