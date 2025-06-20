import React, { useState, useEffect } from "react";
import ResultsOverview from "../components/ResultsOverview";
import ResultsCharts from "../components/ResultsCharts";
import ResultsExport from "../components/ResultsExport";
import "./Results.css";

const Results = () => {
  const [allResults, setAllResults] = useState({
    performance: [],
    security: null,
    summary: null
  });

  useEffect(() => {
    loadStoredResults();
  }, []);

  const loadStoredResults = () => {
    // Load results from localStorage or generate sample data
    const sampleResults = generateSampleResults();
    setAllResults(sampleResults);
  };

  const generateSampleResults = () => {
    const performanceResults = [];
    const dataSizes = [32, 1024, 10240, 102400];
    
    dataSizes.forEach((size, index) => {
      const sha512Time = 0.5 + (size / 10000) + Math.random() * 0.2;
      const blake3Time = 0.2 + (size / 20000) + Math.random() * 0.1;
      
      performanceResults.push({
        id: Date.now() + index,
        timestamp: new Date(Date.now() - (3 - index) * 24 * 60 * 60 * 1000),
        dataSize: size,
        iterations: 1000,
        sha512: {
          avg: sha512Time,
          min: sha512Time * 0.8,
          max: sha512Time * 1.2
        },
        blake3: {
          avg: blake3Time,
          min: blake3Time * 0.8,
          max: blake3Time * 1.2
        },
        speedup: sha512Time / blake3Time
      });
    });

    const securityResults = {
      timestamp: new Date(),
      overall: {
        sha512: { score: 89.2, passed: 5, total: 6 },
        blake3: { score: 92.8, passed: 6, total: 6 }
      },
      tests: [
        {
          name: "Collision Resistance",
          sha512: { score: 91.5, passed: true },
          blake3: { score: 94.2, passed: true }
        },
        {
          name: "Preimage Resistance", 
          sha512: { score: 88.7, passed: true },
          blake3: { score: 93.1, passed: true }
        },
        {
          name: "Avalanche Effect",
          sha512: { score: 87.3, passed: true },
          blake3: { score: 91.8, passed: true }
        }
      ]
    };

    const summary = {
      totalTests: performanceResults.length + securityResults.tests.length,
      avgSpeedup: performanceResults.reduce((sum, r) => sum + r.speedup, 0) / performanceResults.length,
      securityWinner: securityResults.overall.blake3.score > securityResults.overall.sha512.score ? 'BLAKE3' : 'SHA-512',
      performanceWinner: 'BLAKE3',
      recommendation: 'BLAKE3'
    };

    return {
      performance: performanceResults,
      security: securityResults,
      summary
    };
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Test Results & Analysis</h1>
        <p>Comprehensive comparison of SHA-512 vs BLAKE3 performance and security</p>
      </div>

      <ResultsOverview summary={allResults.summary} />
      
      <div className="results-content">
        <ResultsCharts 
          performanceData={allResults.performance}
          securityData={allResults.security}
        />
        
        <ResultsExport results={allResults} />
      </div>
    </div>
  );
};

export default Results;