import React, { useState, useCallback } from "react";
import { blake3 } from "@noble/hashes/blake3";
import { sha512 } from "@noble/hashes/sha2";
import HashingForm from "../components/HashingForm";
import PerformanceChart from "../components/PerformanceChart";
import "./HashingTest.css";

const HashingTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

  const runPerformanceTest = useCallback(async (data, iterations = 1000) => {
    setIsRunning(true);
    setCurrentTest("Running performance tests...");
    
    const results = [];
    const encoded = new TextEncoder().encode(data);

    // Test SHA-512
    setCurrentTest("Testing SHA-512...");
    const sha512Times = [];
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      sha512(encoded);
      const end = performance.now();
      sha512Times.push(end - start);
    }

    // Test BLAKE3
    setCurrentTest("Testing BLAKE3...");
    const blake3Times = [];
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      blake3(encoded);
      const end = performance.now();
      blake3Times.push(end - start);
    }

    // Calculate statistics
    const sha512Avg = sha512Times.reduce((a, b) => a + b, 0) / sha512Times.length;
    const blake3Avg = blake3Times.reduce((a, b) => a + b, 0) / blake3Times.length;
    
    const sha512Min = Math.min(...sha512Times);
    const sha512Max = Math.max(...sha512Times);
    const blake3Min = Math.min(...blake3Times);
    const blake3Max = Math.max(...blake3Times);

    const result = {
      id: Date.now(),
      timestamp: new Date(),
      dataSize: encoded.length,
      iterations,
      sha512: {
        avg: sha512Avg,
        min: sha512Min,
        max: sha512Max,
        times: sha512Times
      },
      blake3: {
        avg: blake3Avg,
        min: blake3Min,
        max: blake3Max,
        times: blake3Times
      },
      speedup: sha512Avg / blake3Avg
    };

    setTestResults(prev => [result, ...prev.slice(0, 9)]);
    setIsRunning(false);
    setCurrentTest(null);
    
    return result;
  }, []);

  const runBenchmarkSuite = useCallback(async () => {
    const testData = [
      { name: "Small (32 bytes)", data: "a".repeat(32) },
      { name: "Medium (1KB)", data: "a".repeat(1024) },
      { name: "Large (10KB)", data: "a".repeat(10240) },
      { name: "XLarge (100KB)", data: "a".repeat(102400) }
    ];

    for (const test of testData) {
      await runPerformanceTest(test.data, 500);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }, [runPerformanceTest]);

  return (
    <div className="hashing-test">
      <div className="test-header">
        <h1>Hash Performance Testing</h1>
        <p>Compare SHA-512 vs BLAKE3 cryptographic hash functions</p>
      </div>

      <div className="test-content">
        <div className="test-left">
          <HashingForm 
            onRunTest={runPerformanceTest}
            onRunBenchmark={runBenchmarkSuite}
            isRunning={isRunning}
            currentTest={currentTest}
          />
        </div>
        
        <div className="test-right">
          <PerformanceChart results={testResults} />
        </div>
      </div>

      {testResults.length > 0 && (
        <div className="results-section">
          <h2>Test Results</h2>
          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Data Size</th>
                  <th>SHA-512 (ms)</th>
                  <th>BLAKE3 (ms)</th>
                  <th>Speedup</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                {testResults.map((result) => (
                  <tr key={result.id}>
                    <td>{result.timestamp.toLocaleTimeString()}</td>
                    <td>{result.dataSize} bytes</td>
                    <td>{result.sha512.avg.toFixed(4)}</td>
                    <td>{result.blake3.avg.toFixed(4)}</td>
                    <td>{result.speedup.toFixed(2)}x</td>
                    <td>
                      <span className={`winner ${result.speedup > 1 ? 'blake3' : 'sha512'}`}>
                        {result.speedup > 1 ? 'BLAKE3' : 'SHA-512'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HashingTest;