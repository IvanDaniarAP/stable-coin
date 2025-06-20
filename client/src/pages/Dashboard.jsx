import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import StatsCard from "../components/StatsCard";
import TransactionHistory from "../components/TransactionHistory";
import QuickActions from "../components/QuickActions";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
  const [walletData, setWalletData] = useState({
    address: null,
    balance: "0.0000",
    tokenBalance: "0.0000"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not found");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      setWalletData({
        address,
        balance: parseFloat(ethers.utils.formatEther(balance)).toFixed(4),
        tokenBalance: "1000.0000" // Mock token balance
      });
    } catch (error) {
      console.error("Error loading wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.email}</p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="ETH Balance"
          value={`${walletData.balance} ETH`}
          icon="💰"
          trend="+2.5%"
        />
        <StatsCard
          title="SUSD Balance"
          value={`${walletData.tokenBalance} SUSD`}
          icon="🪙"
          trend="+5.2%"
        />
        <StatsCard
          title="Total Transactions"
          value="24"
          icon="📊"
          trend="+12.3%"
        />
        <StatsCard
          title="Security Score"
          value="98.5%"
          icon="🛡️"
          trend="+0.8%"
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-left">
          <QuickActions walletAddress={walletData.address} />
        </div>
        <div className="dashboard-right">
          <TransactionHistory userEmail={user?.email} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;