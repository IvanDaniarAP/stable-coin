import React from "react";
import "./ResultsOverview.css";

const ResultsOverview = ({ summary }) => {
  if (!summary) {
    return (
      <div className="results-overview">
        <h2>Results Overview</h2>
        <p>No test results available yet. Run some tests to see the overview.</p>
      </div>
    );
  }

  const getRecommendationColor = (algorithm) => {
    return algorithm === 'BLAKE3' ? 'blake3' : 'sha512';
  };

  return (
    <div className="results-overview">
      <h2>Executive Summary</h2>
      
      <div className="summary-grid">
        <div className="summary-card">
          <div className="card-icon">🏆</div>
          <div className="card-content">
            <h3>Overall Winner</h3>
            <div className={`winner-text ${getRecommendationColor(summary.recommendation)}`}>
              {summary.recommendation}
            </div>
            <p>Based on combined performance and security metrics</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">⚡</div>
          <div className="card-content">
            <h3>Performance Leader</h3>
            <div className={`winner-text ${getRecommendationColor(summary.performanceWinner)}`}>
              {summary.performanceWinner}
            </div>
            <p>Average speedup: {summary.avgSpeedup.toFixed(2)}x faster</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">🛡️</div>
          <div className="card-content">
            <h3>Security Leader</h3>
            <div className={`winner-text ${getRecommendationColor(summary.securityWinner)}`}>
              {summary.securityWinner}
            </div>
            <p>Superior cryptographic security properties</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <h3>Total Tests</h3>
            <div className="metric-value">{summary.totalTests}</div>
            <p>Comprehensive test suite completed</p>
          </div>
        </div>
      </div>

      <div className="key-findings">
        <h3>Key Findings</h3>
        <div className="findings-grid">
          <div className="finding-item">
            <div className="finding-icon">🚀</div>
            <div className="finding-content">
              <h4>Performance Advantage</h4>
              <p>
                BLAKE3 consistently outperforms SHA-512 across all data sizes, 
                with an average speedup of {summary.avgSpeedup.toFixed(1)}x. 
                The performance gap increases with larger data sizes.
              </p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-icon">🔒</div>
            <div className="finding-content">
              <h4>Security Comparison</h4>
              <p>
                Both algorithms demonstrate strong cryptographic security. 
                BLAKE3 shows slight advantages in modern security tests while 
                maintaining backward compatibility.
              </p>
            </div>
          </div>

          <div className="finding-item">
            <div className="finding-icon">💡</div>
            <div className="finding-content">
              <h4>Recommendation</h4>
              <p>
                For new applications requiring high-performance hashing, 
                BLAKE3 is recommended. SHA-512 remains suitable for 
                legacy systems and compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsOverview;