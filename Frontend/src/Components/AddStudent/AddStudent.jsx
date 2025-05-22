import { useState } from "react";
import PropTypes from "prop-types";
import "./addstudent.css";
import axios from "axios";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import "./modalstyles.css";

export default function AddStudent({ onSuccess }) {
  const [values, setValues] = useState({
    studentID: "",
    studentName: "",
    studentEmail: "",
    studentMobileNo: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.studentID || !values.studentName || !values.studentEmail || !values.studentMobileNo) {
      setError("Заполните все поля!");
      return;
    }
    setError("");
    axios
      .post("http://localhost:3001/api/student", values)
      .then((res) => {
        console.log(res);
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        setError("Ошибка при добавлении студента.");
      });
  };

  return (
    <div className="add-student-container">
      <form className="add-student-form" onSubmit={handleSubmit}>
        <h1 className="form-title">Добавить студента</h1>

        {error && <p className="error-message">{error}</p>}

        <InputWithLabel
          type="text"
          label="ID студента:"
          value={values.studentID}
          onChange={(e) => setValues({ ...values, studentID: e.target.value })}
        />
        <InputWithLabel
          type="text"
          label="Имя:"
          value={values.studentName}
          onChange={(e) => setValues({ ...values, studentName: e.target.value })}
        />
        <InputWithLabel
          type="text"
          label="Email:"
          value={values.studentEmail}
          onChange={(e) => setValues({ ...values, studentEmail: e.target.value })}
        />
        <InputWithLabel
          type="text"
          label="Телефон:"
          value={values.studentMobileNo}
          onChange={(e) => setValues({ ...values, studentMobileNo: e.target.value })}
        />

        <button type="submit" className="submit-btn">
          Добавить
        </button>
      </form>
    </div>
  );
}

AddStudent.propTypes = {
  onSuccess: PropTypes.func,
};