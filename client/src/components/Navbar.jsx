import React from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onLogout) onLogout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <div className="brand-icon">🪙</div>
          <span>StableCoin</span>
        </Link>

        <div className="navbar-menu">
          <Link 
            to="/dashboard" 
            className={`navbar-item ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <i className="fas fa-home"></i>
            Dashboard
          </Link>
          
          <Link 
            to="/profile" 
            className={`navbar-item ${isActive('/profile') ? 'active' : ''}`}
          >
            <i className="fas fa-user"></i>
            Profile
          </Link>
          
          <Link 
            to="/hashing" 
            className={`navbar-item ${isActive('/hashing') ? 'active' : ''}`}
          >
            <i className="fas fa-shield-alt"></i>
            Hashing Test
          </Link>
          
          <Link 
            to="/security" 
            className={`navbar-item ${isActive('/security') ? 'active' : ''}`}
          >
            <i className="fas fa-lock"></i>
            Security
          </Link>
          
          <Link 
            to="/results" 
            className={`navbar-item ${isActive('/results') ? 'active' : ''}`}
          >
            <i className="fas fa-chart-bar"></i>
            Results
          </Link>
        </div>

        <div className="navbar-user">
          {user && (
            <>
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="logout-btn">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;