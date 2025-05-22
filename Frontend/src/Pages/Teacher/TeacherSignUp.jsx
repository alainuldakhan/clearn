import { useState, useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
import Header from "../../Components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../../Components/InputBox/InputBox";
import "./teachersignup.css";
import signupimg from "../../assets/signup.svg";
import axios from "axios";

export default function TeacherSignUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!values.name || !values.email || !values.mobile || !values.password || !values.confirmpassword) {
      setError("Заполните все поля");
      return false;
    }
    if (values.password !== values.confirmpassword) {
      setError("Пароли не совпадают");
      return false;
    }
    if (values.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
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
      const res = await axios.post("http://localhost:3001/api/auth/teachersignup", values);
      if (res.data.message) {
        alert("Регистрация прошла успешно");
        navigate("/teachersignin");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка регистрации");
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
      <div className="signup-container">
        <div className="signup-leftside">
          <div className="signup-title">
            <h1>
              <span>Преподаватель</span>
            </h1>
            <br></br>
            <h2>Введите данные для создания аккаунта</h2>
          </div>
          <img src={signupimg} alt="signup" />
        </div>

        <div className="signup-rightside">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <div className="signup-input">
              <InputBox name="name" type="text" placeholder="Имя" src="src/assets/user.png" value={values.name} onChange={handleChange} />
              <InputBox name="email" type="email" placeholder="Email" src="src/assets/email.png" value={values.email} onChange={handleChange} />
              <InputBox name="password" type="password" placeholder="Пароль" src="src/assets/password.png" value={values.password} onChange={handleChange} />
              <InputBox name="confirmpassword" type="password" placeholder="Повторите пароль" src="src/assets/password.png" value={values.confirmpassword} onChange={handleChange} />
              <InputBox name="mobile" type="text" placeholder="Номер телефона" src="src/assets/mobile.png" value={values.mobile} onChange={handleChange} />
            </div>

            <button className="signup-btn" disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </form>

          <p className="linktosignin">
            Уже есть аккаунт? <span><Link to="/teachersignin">Войти</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
}
