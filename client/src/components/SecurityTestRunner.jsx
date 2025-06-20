import React from "react";
import "./SecurityTestRunner.css";

const SecurityTestRunner = ({ onRunTests, isRunning }) => {
  const securityTests = [
    {
      name: "Collision Resistance",
      description: "Tests the difficulty of finding two inputs that produce the same hash",
      icon: "🔍"
    },
    {
      name: "Preimage Resistance",
      description: "Tests the difficulty of finding an input that produces a specific hash",
      icon: "🎯"
    },
    {
      name: "Second Preimage Resistance",
      description: "Tests finding a different input that produces the same hash as a given input",
      icon: "🔄"
    },
    {
      name: "Avalanche Effect",
      description: "Tests how much the output changes when the input changes slightly",
      icon: "❄️"
    },
    {
      name: "Distribution Analysis",
      description: "Tests the randomness and uniformity of hash outputs",
      icon: "📊"
    },
    {
      name: "Entropy Analysis",
      description: "Measures the information content and unpredictability",
      icon: "🌀"
    }
  ];

  return (
    <div className="security-test-runner">
      <h2>Security Test Suite</h2>
      
      <div className="test-overview">
        <p>
          This comprehensive security analysis evaluates both SHA-512 and BLAKE3 
          against industry-standard cryptographic security criteria.
        </p>
      </div>

      <div className="tests-grid">
        {securityTests.map((test, index) => (
          <div key={index} className="test-card">
            <div className="test-icon">{test.icon}</div>
            <div className="test-content">
              <h3>{test.name}</h3>
              <p>{test.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="test-controls">
        <button 
          onClick={onRunTests}
          disabled={isRunning}
          className="run-security-btn"
        >
          {isRunning ? (
            <>
              <div className="security-spinner"></div>
              Running Security Tests...
            </>
          ) : (
            <>
              <i className="fas fa-shield-alt"></i>
              Run Complete Security Analysis
            </>
          )}
        </button>
      </div>

      {isRunning && (
        <div className="test-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p>Executing comprehensive security tests...</p>
        </div>
      )}
    </div>
  );
};

export default SecurityTestRunner;