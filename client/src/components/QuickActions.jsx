import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickActions.css";

const QuickActions = ({ walletAddress }) => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Hash Performance Test",
      description: "Compare SHA-512 vs BLAKE3 performance",
      icon: "⚡",
      color: "primary",
      onClick: () => navigate("/hashing")
    },
    {
      title: "Security Analysis",
      description: "Run comprehensive security tests",
      icon: "🛡️",
      color: "success",
      onClick: () => navigate("/security")
    },
    {
      title: "View Results",
      description: "Check test results and analytics",
      icon: "📊",
      color: "info",
      onClick: () => navigate("/results")
    },
    {
      title: "Transfer Tokens",
      description: "Send SUSD with hash verification",
      icon: "💸",
      color: "warning",
      onClick: () => navigate("/hashing")
    }
  ];

  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>
      <div className="actions-grid">
        {actions.map((action, index) => (
          <div
            key={index}
            className={`action-card action-${action.color}`}
            onClick={action.onClick}
          >
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>
            <div className="action-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;