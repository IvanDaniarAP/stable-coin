import React from "react";
import Navbar from "./Navbar";
import "./Layout.css";

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="layout">
      <Navbar user={user} onLogout={onLogout} />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 StableCoin Simulation - SHA-512 vs BLAKE3 Performance Testing</p>
          <p>Developed by <strong>IVAN DANIAR</strong> | Telkom University</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;