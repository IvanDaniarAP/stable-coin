// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import HashedTransferForm from "./components/HashedTransferForm.jsx";

function AppRoutes({ currentUser, handleLogout }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={currentUser}>
            <Dashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="/hashing" element={<HashedTransferForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const { currentUser, handleLogout, loading } = useAuth();

  if (loading) {
    return <p>Loading auth...</p>; // ❗jangan render router sebelum loading selesai
  }

  return (
    <Router>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/profil">Profil</NavLink>
        <NavLink to="/hashing">Hashing</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </nav>
      <AppRoutes currentUser={currentUser} handleLogout={handleLogout} />
    </Router>
  );
}

export default App;
