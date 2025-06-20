import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import "./TransactionHistory.css";

const TransactionHistory = ({ userEmail }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      fetchTransactions();
    }
  }, [userEmail]);

  const fetchTransactions = async () => {
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

      setTransactions(txData.slice(0, 5)); // Show only last 5 transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatHash = (hash) => {
    if (!hash) return "N/A";
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
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
      <div className="transaction-history">
        <h2>Recent Transactions</h2>
        <div className="loading-transactions">
          <div className="loading-spinner-small"></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-history">
      <div className="history-header">
        <h2>Recent Transactions</h2>
        <button onClick={fetchTransactions} className="refresh-btn">
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
            <div key={tx.id} className="transaction-item">
              <div className="tx-main">
                <div className="tx-info">
                  <div className="tx-amount">{tx.amount} SUSD</div>
                  <div className="tx-recipient">
                    To: {tx.recipient?.substring(0, 8)}...{tx.recipient?.substring(tx.recipient.length - 6)}
                  </div>
                </div>
                <div className="tx-meta">
                  <span className={`hash-type ${getHashTypeColor(tx.hashType)}`}>
                    {tx.hashType}
                  </span>
                  <div className="tx-date">{formatDate(tx.timestamp)}</div>
                </div>
              </div>
              <div className="tx-hash">
                Hash: {formatHash(tx.hash)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;