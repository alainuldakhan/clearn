import { useState } from "react";
import PropTypes from "prop-types";
import "./addcourse.css";
import "./modalstyles.css";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import axios from "axios";

export default function AddCourse({ onSuccess }) {
  const [values, setValues] = useState({
    module_code: "",
    module_name: "",
  });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.module_code || !values.module_name) {
      setError("Заполните все поля!");
      return;
    }
    setError("");
    axios
      .post("http://localhost:3001/api/module", values)
      .then(() => onSuccess && onSuccess())
      .catch(() => setError("Ошибка при добавлении курса."));
  }

  return (
    <div className="addcourse-container">
      <form className="addcourse-form" onSubmit={handleSubmit}>
        <h2>Добавить курс</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="addcourseinputs">
          <InputWithLabel
            label="Код курса"
            type="text"
            className="courseinputs"
            onChange={(e) => setValues({ ...values, module_code: e.target.value })}
          />
          <InputWithLabel
            label="Название курса"
            type="text"
            className="courseinputs"
            onChange={(e) => setValues({ ...values, module_name: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-btn">
          Добавить
        </button>
      </form>
    </div>
  );
}

AddCourse.propTypes = {
  onSuccess: PropTypes.func,
};
