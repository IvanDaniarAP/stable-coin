import React from "react";
import "./StatsCard.css";

const StatsCard = ({ title, value, icon, trend, color = "primary" }) => {
  const isPositive = trend && trend.startsWith('+');
  
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-header">
        <div className="stats-icon">{icon}</div>
        {trend && (
          <div className={`stats-trend ${isPositive ? 'positive' : 'negative'}`}>
            {trend}
          </div>
        )}
      </div>
      <div className="stats-content">
        <h3 className="stats-value">{value}</h3>
        <p className="stats-title">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;