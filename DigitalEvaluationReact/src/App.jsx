import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/loginpage/Login";
import Register from "./pages/Registrationpage/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Colleges from "./pages/Colleges/Colleges";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Students from "./pages/Students/Students";
import Branches from "./pages/Branches/Branches";
import Courses from "./pages/Courses/Courses";
import Subjects from "./pages/Subjects/Subjects";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/colleges"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Colleges />
              </ProtectedRoute>
            }
          />


          <Route
            path="/students"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Students />
              </ProtectedRoute>
            }
          />

          <Route
            path="/branches"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Branches />
              </ProtectedRoute>
            }
          />


           <Route
            path="/courses"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Courses />
              </ProtectedRoute>
            }
          />
           
            <Route
            path="/subjects"
            element={
              <ProtectedRoute allowedRoles={["Admin", "User"]}>
                <Subjects />
              </ProtectedRoute>
            }
          />






        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
