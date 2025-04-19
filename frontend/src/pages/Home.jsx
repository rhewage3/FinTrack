import React, { useState } from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2 } from 'lucide-react';

const Home = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Wallet', balance: 12000 },
    { id: 2, name: 'Bank', balance: 45000 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    id: null,
    name: '',
    balance: '',
    category: ''
  });
  const [isEditing, setIsEditing] = useState(false);


  const addAccount = () => {
    if (!newAccount.name || !newAccount.balance) return;
    setAccounts([
      ...accounts,
      { id: Date.now(), name: newAccount.name, balance: Number(newAccount.balance) },
    ]);
    setNewAccount({ name: '', balance: '' });
    setShowModal(false);
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  return (
    <div className="container-fluid home-container">
      <div className="row accounts-header justify-content-between align-items-center mb-3">
        <div className="col-12 col-md-6">
          <h2>Your Accounts</h2>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0">
          <button className="btn btn-outline-light" onClick={() => setShowModal(true)}>
            <PlusCircle size={20} /> Add Account
          </button>
        </div>
      </div>

      <div className="account-cards d-flex flex-wrap gap-3">
        {accounts.map((acc) => (
          <motion.div
            className="account-card"
            key={acc.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="d-flex justify-content-between">
              <h5>{acc.name}</h5>
              

            </div>
            <p className="balance">Rs. {acc.balance.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div
            className="add-account-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h4>{isEditing ? 'Edit Account' : 'Add Account'}</h4>

            <input
              type="text"
              placeholder="Account Name"
              className="form-control mb-2"
              value={newAccount.name}
              onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
            />

            <select
              className="form-select mb-2"
              value={newAccount.category}
              onChange={(e) => setNewAccount({ ...newAccount, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="wallet">Wallet</option>
              <option value="bank">Bank</option>
              <option value="credit">Credit</option>
            </select>

            <input
              type="number"
              placeholder="Balance"
              className="form-control mb-3"
              value={newAccount.balance}
              onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
            />

            <button
              className="btn btn-success w-100"
              onClick={() => {
                if (isEditing) {
                  setAccounts((prev) =>
                    prev.map((acc) => (acc.id === newAccount.id ? newAccount : acc))
                  );
                  toast.success("Account updated ✅");
                } else {
                  setAccounts([
                    ...accounts,
                    {
                      id: Date.now(),
                      name: newAccount.name,
                      balance: Number(newAccount.balance),
                      category: newAccount.category
                    },
                  ]);
                  toast.success("Account added ✅");
                }

                setNewAccount({ id: null, name: '', balance: '', category: '' });
                setIsEditing(false);
                setShowModal(false);
              }}
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default Home;
