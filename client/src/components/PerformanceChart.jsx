import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import "./PerformanceChart.css";

const PerformanceChart = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="performance-chart">
        <h2>Performance Visualization</h2>
        <div className="no-data">
          <div className="no-data-icon">📊</div>
          <p>No test results yet</p>
          <small>Run some tests to see performance charts</small>
        </div>
      </div>
    );
  }

  const chartData = results.slice().reverse().map((result, index) => ({
    test: `Test ${index + 1}`,
    'SHA-512': result.sha512.avg,
    'BLAKE3': result.blake3.avg,
    dataSize: result.dataSize,
    speedup: result.speedup
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-data">Data Size: {data.dataSize} bytes</p>
          <p className="tooltip-sha512">SHA-512: {data['SHA-512'].toFixed(4)} ms</p>
          <p className="tooltip-blake3">BLAKE3: {data['BLAKE3'].toFixed(4)} ms</p>
          <p className="tooltip-speedup">Speedup: {data.speedup.toFixed(2)}x</p>
        </div>
      );
    }
    return null;
  };

  const latestResult = results[0];
  const avgSpeedup = results.reduce((sum, r) => sum + r.speedup, 0) / results.length;

  return (
    <div className="performance-chart">
      <h2>Performance Visualization</h2>
      
      <div className="chart-stats">
        <div className="stat-item">
          <span className="stat-label">Latest Speedup</span>
          <span className="stat-value">{latestResult.speedup.toFixed(2)}x</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Speedup</span>
          <span className="stat-value">{avgSpeedup.toFixed(2)}x</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Tests Run</span>
          <span className="stat-value">{results.length}</span>
        </div>
      </div>

      <div className="chart-container">
        <h3>Execution Time Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="test" />
            <YAxis label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="SHA-512" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="BLAKE3" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Performance Speedup</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="test" />
            <YAxis label={{ value: 'Speedup (x)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value) => [`${value.toFixed(2)}x`, 'Speedup']}
              labelFormatter={(label) => `Test: ${label}`}
            />
            <Bar 
              dataKey="speedup" 
              fill="url(#speedupGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="speedupGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="performance-summary">
        <h3>Performance Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-icon sha512">🔴</div>
            <div className="summary-content">
              <h4>SHA-512</h4>
              <p>Average: {(results.reduce((sum, r) => sum + r.sha512.avg, 0) / results.length).toFixed(4)} ms</p>
              <p>Best: {Math.min(...results.map(r => r.sha512.min)).toFixed(4)} ms</p>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-icon blake3">🟢</div>
            <div className="summary-content">
              <h4>BLAKE3</h4>
              <p>Average: {(results.reduce((sum, r) => sum + r.blake3.avg, 0) / results.length).toFixed(4)} ms</p>
              <p>Best: {Math.min(...results.map(r => r.blake3.min)).toFixed(4)} ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;