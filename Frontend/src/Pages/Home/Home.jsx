import { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";
import "./home.css";
import ButtonOne from "../../Components/ButtonOne/ButtonOne";
import ButtonTwo from "../../Components/ButtonTwo/ButtonTwo";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";

export default function Home() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"} className="home">
      <Header isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <div className="heroSection">
        <div className="gradi"></div>
        <div className="leftSide">
          <h1 className="welcome">
            Добро пожаловать в <span>С-learn</span>
          </h1>
          <p>
            C-learn — онлайн-платформа для изучения языка программирования C.
            Начни с основ, совершенствуй навыки и достигай профессионального уровня.
          </p>
          <div className="buttons">
            <Link to="/choosesignup">
              <ButtonOne text="Регистрация" />
            </Link>
            <Link to="/choosesignin">
              <ButtonTwo text="Вход" />
            </Link>
          </div>
        </div>
        <div className="rightSide">
          <img src="src/assets/HeroImage.svg" alt="HeroImage" />
        </div>
      </div>
    </div>
  );
}
