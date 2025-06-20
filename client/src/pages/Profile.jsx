import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import "./Profile.css";

const Profile = ({ user }) => {
  const [walletData, setWalletData] = useState({
    address: null,
    balance: "0.0000",
    tokenBalance: "0.0000"
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      await Promise.all([
        loadWalletData(),
        loadTransactions()
      ]);
    } catch (error) {
      console.error("Error loading profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadWalletData = async () => {
    try {
      if (!window.ethereum) return;

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
    }
  };

  const loadTransactions = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const transaksiRef = collection(db, "user", currentUser.uid, "transaction");
      const q = query(transaksiRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);

      const txData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTransactions(txData);
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  };

  const formatHash = (hash) => {
    if (!hash) return "N/A";
    return `${hash.substring(0, 12)}...${hash.substring(hash.length - 12)}`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  const getHashTypeColor = (hashType) => {
    switch (hashType) {
      case "SHA-512": return "hash-sha512";
      case "BLAKE3": return "hash-blake3";
      case "SHA512+BLAKE3": return "hash-combined";
      default: return "hash-default";
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Manage your account and view transaction history</p>
      </div>

      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-card">
            <div className="profile-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="profile-info">
              <h2>{user?.email}</h2>
              <p>Stable Coin User</p>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-value">{transactions.length}</span>
                  <span className="stat-label">Transactions</span>
                </div>
                <div className="stat">
                  <span className="stat-value">
                    {transactions.filter(tx => tx.hashType === 'BLAKE3').length}
                  </span>
                  <span className="stat-label">BLAKE3 Tests</span>
                </div>
                <div className="stat">
                  <span className="stat-value">
                    {transactions.filter(tx => tx.hashType === 'SHA-512').length}
                  </span>
                  <span className="stat-label">SHA-512 Tests</span>
                </div>
              </div>
            </div>
          </div>

          <div className="wallet-card">
            <h3>Wallet Information</h3>
            <div className="wallet-details">
              <div className="wallet-item">
                <span className="wallet-label">Address:</span>
                <span className="wallet-value">
                  {walletData.address ? 
                    `${walletData.address.substring(0, 8)}...${walletData.address.substring(walletData.address.length - 8)}` 
                    : "Not connected"
                  }
                </span>
              </div>
              <div className="wallet-item">
                <span className="wallet-label">ETH Balance:</span>
                <span className="wallet-value">{walletData.balance} ETH</span>
              </div>
              <div className="wallet-item">
                <span className="wallet-label">SUSD Balance:</span>
                <span className="wallet-value">{walletData.tokenBalance} SUSD</span>
              </div>
            </div>
            <button onClick={loadWalletData} className="refresh-wallet-btn">
              <i className="fas fa-sync-alt"></i>
              Refresh Wallet
            </button>
          </div>
        </div>

        <div className="profile-right">
          <div className="transactions-card">
            <div className="transactions-header">
              <h3>Transaction History</h3>
              <button onClick={loadTransactions} className="refresh-tx-btn">
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>

            {transactions.length === 0 ? (
              <div className="no-transactions">
                <div className="no-tx-icon">📝</div>
                <p>No transactions yet</p>
                <small>Your transaction history will appear here</small>
              </div>
            ) : (
              <div className="transactions-list">
                {transactions.map((tx) => (
                  <div key={tx.id} className="transaction-card">
                    <div className="tx-header">
                      <div className="tx-amount">{tx.amount} SUSD</div>
                      <span className={`hash-type ${getHashTypeColor(tx.hashType)}`}>
                        {tx.hashType}
                      </span>
                    </div>
                    <div className="tx-details">
                      <div className="tx-detail">
                        <span className="tx-label">To:</span>
                        <span className="tx-value">
                          {tx.recipient?.substring(0, 8)}...{tx.recipient?.substring(tx.recipient.length - 6)}
                        </span>
                      </div>
                      <div className="tx-detail">
                        <span className="tx-label">Hash:</span>
                        <span className="tx-value">{formatHash(tx.hash)}</span>
                      </div>
                      <div className="tx-detail">
                        <span className="tx-label">Date:</span>
                        <span className="tx-value">{formatDate(tx.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;