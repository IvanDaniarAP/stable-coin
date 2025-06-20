import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Layout from "./components/Layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import HashingTest from "./pages/HashingTest";
import SecurityTest from "./pages/SecurityTest";
import Results from "./pages/Results";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { currentUser, handleLogout, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute user={currentUser}>
            <Layout user={currentUser} onLogout={handleLogout}>
              <Dashboard user={currentUser} />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute user={currentUser}>
            <Layout user={currentUser} onLogout={handleLogout}>
              <Profile user={currentUser} />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/hashing" element={
          <ProtectedRoute user={currentUser}>
            <Layout user={currentUser} onLogout={handleLogout}>
              <HashingTest />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/security" element={
          <ProtectedRoute user={currentUser}>
            <Layout user={currentUser} onLogout={handleLogout}>
              <SecurityTest />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/results" element={
          <ProtectedRoute user={currentUser}>
            <Layout user={currentUser} onLogout={handleLogout}>
              <Results />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;