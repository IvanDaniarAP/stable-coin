import React from "react";
import "./SecurityResults.css";

const SecurityResults = ({ results }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "excellent";
    if (score >= 80) return "good";
    if (score >= 70) return "fair";
    return "poor";
  };

  const getOverallRating = (score) => {
    if (score >= 95) return "Excellent";
    if (score >= 90) return "Very Good";
    if (score >= 85) return "Good";
    if (score >= 80) return "Acceptable";
    return "Needs Improvement";
  };

  return (
    <div className="security-results">
      <div className="results-header">
        <h2>Security Analysis Results</h2>
        <p>Completed on {results.timestamp.toLocaleString()}</p>
      </div>

      <div className="overall-scores">
        <div className="score-card sha512">
          <div className="score-header">
            <h3>SHA-512</h3>
            <div className={`score-badge ${getScoreColor(results.overall.sha512.score)}`}>
              {results.overall.sha512.score.toFixed(1)}%
            </div>
          </div>
          <div className="score-details">
            <p>Rating: {getOverallRating(results.overall.sha512.score)}</p>
            <p>Tests Passed: {results.overall.sha512.passed}/{results.overall.sha512.total}</p>
          </div>
          <div className="score-bar">
            <div 
              className="score-fill sha512-fill"
              style={{ width: `${results.overall.sha512.score}%` }}
            ></div>
          </div>
        </div>

        <div className="score-card blake3">
          <div className="score-header">
            <h3>BLAKE3</h3>
            <div className={`score-badge ${getScoreColor(results.overall.blake3.score)}`}>
              {results.overall.blake3.score.toFixed(1)}%
            </div>
          </div>
          <div className="score-details">
            <p>Rating: {getOverallRating(results.overall.blake3.score)}</p>
            <p>Tests Passed: {results.overall.blake3.passed}/{results.overall.blake3.total}</p>
          </div>
          <div className="score-bar">
            <div 
              className="score-fill blake3-fill"
              style={{ width: `${results.overall.blake3.score}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="detailed-results">
        <h3>Detailed Test Results</h3>
        <div className="results-table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Security Test</th>
                <th>SHA-512</th>
                <th>BLAKE3</th>
                <th>Winner</th>
              </tr>
            </thead>
            <tbody>
              {results.tests.map((test, index) => (
                <tr key={index}>
                  <td className="test-name">{test.name}</td>
                  <td className="test-score">
                    <div className={`score-cell ${getScoreColor(test.sha512.score)}`}>
                      <span className="score-value">{test.sha512.score.toFixed(1)}%</span>
                      <span className={`status ${test.sha512.passed ? 'passed' : 'failed'}`}>
                        {test.sha512.passed ? '✓' : '✗'}
                      </span>
                    </div>
                  </td>
                  <td className="test-score">
                    <div className={`score-cell ${getScoreColor(test.blake3.score)}`}>
                      <span className="score-value">{test.blake3.score.toFixed(1)}%</span>
                      <span className={`status ${test.blake3.passed ? 'passed' : 'failed'}`}>
                        {test.blake3.passed ? '✓' : '✗'}
                      </span>
                    </div>
                  </td>
                  <td className="winner">
                    <span className={`winner-badge ${test.blake3.score > test.sha512.score ? 'blake3' : 'sha512'}`}>
                      {test.blake3.score > test.sha512.score ? 'BLAKE3' : 'SHA-512'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="test-details">
        <h3>Test Details</h3>
        <div className="details-grid">
          {results.tests.map((test, index) => (
            <div key={index} className="detail-card">
              <h4>{test.name}</h4>
              <div className="detail-algorithms">
                <div className="algorithm-detail">
                  <h5>SHA-512</h5>
                  <p>{test.sha512.details}</p>
                </div>
                <div className="algorithm-detail">
                  <h5>BLAKE3</h5>
                  <p>{test.blake3.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityResults;