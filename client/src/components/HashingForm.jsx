import React, { useState } from "react";
import "./HashingForm.css";

const HashingForm = ({ onRunTest, onRunBenchmark, isRunning, currentTest }) => {
  const [testData, setTestData] = useState("Hello, World!");
  const [iterations, setIterations] = useState(1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRunning && testData.trim()) {
      onRunTest(testData, iterations);
    }
  };

  const handleBenchmark = () => {
    if (!isRunning) {
      onRunBenchmark();
    }
  };

  return (
    <div className="hashing-form">
      <h2>Performance Test Configuration</h2>
      
      <form onSubmit={handleSubmit} className="test-form">
        <div className="form-group">
          <label htmlFor="testData">Test Data</label>
          <textarea
            id="testData"
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
            placeholder="Enter data to hash..."
            rows={4}
            disabled={isRunning}
          />
          <small>Data size: {new TextEncoder().encode(testData).length} bytes</small>
        </div>

        <div className="form-group">
          <label htmlFor="iterations">Iterations</label>
          <input
            id="iterations"
            type="number"
            value={iterations}
            onChange={(e) => setIterations(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="10000"
            disabled={isRunning}
          />
          <small>Number of hash operations to perform</small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isRunning || !testData.trim()}
          >
            {isRunning ? (
              <>
                <div className="btn-spinner"></div>
                Running Test...
              </>
            ) : (
              <>
                <i className="fas fa-play"></i>
                Run Single Test
              </>
            )}
          </button>

          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={handleBenchmark}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <div className="btn-spinner"></div>
                Running Benchmark...
              </>
            ) : (
              <>
                <i className="fas fa-chart-line"></i>
                Run Benchmark Suite
              </>
            )}
          </button>
        </div>
      </form>

      {isRunning && currentTest && (
        <div className="test-status">
          <div className="status-spinner"></div>
          <span>{currentTest}</span>
        </div>
      )}

      <div className="algorithm-info">
        <h3>Algorithm Information</h3>
        <div className="algo-cards">
          <div className="algo-card sha512">
            <h4>SHA-512</h4>
            <ul>
              <li>Output: 512 bits (64 bytes)</li>
              <li>Rounds: 80</li>
              <li>Block size: 1024 bits</li>
              <li>Cryptographically secure</li>
            </ul>
          </div>
          <div className="algo-card blake3">
            <h4>BLAKE3</h4>
            <ul>
              <li>Output: Variable (default 256 bits)</li>
              <li>Parallel processing</li>
              <li>Tree hashing structure</li>
              <li>Faster than SHA-2 family</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashingForm;