import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import Home from "./Pages/Home/Home";
import AddStudent from "./Components/AddStudent/AddStudent";
import StudentSignUp from "./Pages/Student/StudentSignUp";
import StudentSignIn from "./Pages/Student/StudentSignIn";
import ChooseSignIn from "./Pages/Choose Role/ChooseSignIn";
import ChooseSignUp from "./Pages/Choose Role/ChooseSignUp";
import TeacherSignIn from "./Pages/Teacher/TeacherSignIn";
import TeacherSignUp from "./Pages/Teacher/TeacherSignUp";
import StudentDashboard from "./Pages/Student/StudentDashboard";
import TeacherDashboard from "./Pages/Teacher/TeacherDashboard";
import Student from "./Pages/Student/Student";
import Teacher from "./Pages/Teacher/Teacher";
import StudentCourses from "./Pages/Student/StudentCourses";
import StudentAllcourses from "./Pages/Student/StudentAllcourses";
import StudentAssignments from "./Pages/Student/StudentAssignments";
import StudentSettings from "./Pages/Student/StudentSettings";
import TeacherCourses from "./Pages/Teacher/TeacherCourses";
import TeacherStudents from "./Pages/Teacher/TeacherStudents";
import TeacherSettings from "./Pages/Teacher/TeacherSettings";
import TeacherAssignments from "./Pages/Teacher/TeacherAssignments";
import TeacherAnnouncements from "./Pages/Teacher/TeacherAnnouncements";
import StudentAnnouncements from "./Pages/Student/StudentAnnouncements";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studentsignup" element={<StudentSignUp />} />
          <Route path="/studentsignin" element={<StudentSignIn />} />
          <Route path="/teachersignin" element={<TeacherSignIn />} />
          <Route path="/teachersignup" element={<TeacherSignUp />} />
          <Route path="/studentcreate" element={<AddStudent />} />
          <Route path="/choosesignin" element={<ChooseSignIn />} />
          <Route path="/choosesignup" element={<ChooseSignUp />} />

          <Route path="/student" element={<Student />}>
            <Route index element={<StudentDashboard />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="mycourses" element={<StudentCourses />} />
            <Route path="allcourses" element={<StudentAllcourses />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="announcements" element={<StudentAnnouncements />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>

          <Route path="/teacher" element={<Teacher />}>
            <Route index element={<TeacherDashboard />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="announcements" element={<TeacherAnnouncements />} />
            <Route path="assignments" element={<TeacherAssignments />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="settings" element={<TeacherSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
