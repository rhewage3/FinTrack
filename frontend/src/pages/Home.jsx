import React, { useState, useEffect } from 'react';
import './Home.css';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import Select from 'react-select';
import api from '../api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import AddTransactionModal from '../Components/AddTransactionModal';





const Home = () => {
  const [accounts, setAccounts] = useState([]);
  //for transaction modal
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [categories, setCategories] = useState([]);

  //This will run once when the component loads and populate the account list from  backend.
  useEffect(() => {
    fetchAccounts();
  }, []);


  //fetchin categories
  useEffect(() => {
    fetchAccounts();
    fetchCategories(); // load categories on startup
  }, []);


  //accounts
  const fetchAccounts = async () => {
    try {
      const res = await api.get('/accounts');
      setAccounts(res.data);
    } catch (err) {
      toast.error("Failed to load accounts ❌");
    }
  };


  //categories
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories'); // Make sure this endpoint exists
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories ❌");
    }
  };


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


  const deleteAccount = async (id) => {
    Swal.fire({
      title: 'Delete this account?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      background: '#1a1a1a',
      color: '#fff',
      iconColor: '#f44336',
      showCancelButton: true,
      confirmButtonColor: '#f44336',
      cancelButtonColor: '#555',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'modern-swal',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call backend DELETE API
          await api.delete(`/accounts/${id}`);

          // If successful, update frontend
          setAccounts((prev) => prev.filter((acc) => acc.id !== id));
          toast.success("Account deleted ✅");
        } catch (error) {
          toast.error("Failed to delete ❌");
          console.error("Delete failed:", error);
        }
      }
    });
  };


  const categoryOptions = [
    { value: 'wallet', label: 'Wallet' },
    { value: 'bank', label: 'Bank' },
    { value: 'credit', label: 'Credit' }
  ];



  const handleSave = async () => {
    if (!newAccount.name || !newAccount.balance || !newAccount.category) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (isEditing) {
        const res = await api.put(`/accounts/${newAccount.id}`, newAccount);
        setAccounts(prev => prev.map(acc => acc.id === newAccount.id ? res.data : acc));
        toast.success("Account updated ✅");
      } else {
        const res = await api.post('/accounts', newAccount);
        setAccounts(prev => [res.data, ...prev]);
        toast.success("Account added ✅");
      }

      setNewAccount({ id: null, name: '', balance: '', category: '' });
      setIsEditing(false);
      setShowModal(false);
    } catch (err) {
      toast.error("Failed to save account ❌");
    }
  };


  return (
    <div className="container-fluid home-container">
      <div className="row accounts-header justify-content-between align-items-center mb-3">
        <div className="col-12 col-md-6">
          <h2>Your Accounts</h2>
        </div>
        <div className="col-12 col-md-6 text-md-end mt-3 mt-md-0 mr-3">
          <button className="btn btn-outline-light" onClick={() => {
            setNewAccount({ id: null, name: '', balance: '', category: '' });
            setIsEditing(false);
            setShowModal(true);
          }}
          >
            <PlusCircle size={20} /> Add Account
          </button>

          <button onClick={() => setShowTransactionModal(true)} className="btn btn-outline-light ms-3 ">Add Transaction</button>
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


              <div className="d-flex gap-2">
                <button
                  className="icon-btn"
                  title="Edit"
                  onClick={() => {
                    setNewAccount(acc);
                    setIsEditing(true);
                    setShowModal(true);
                  }}
                >
                  <Pencil size={18} />
                </button>

                <button
                  className="icon-btn text-danger"
                  title="Delete"
                  onClick={() => deleteAccount(acc.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>


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

            <Select
              styles={customStyles}
              className="mb-2"
              placeholder="Select Category"
              value={categoryOptions.find(opt => opt.value === newAccount.category)}
              onChange={(selected) => setNewAccount({ ...newAccount, category: selected.value })}
              options={categoryOptions}
            />



            <input
              type="number"
              placeholder="Balance"
              className="form-control mb-3"
              value={newAccount.balance}
              onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
            />

            <button className="btn btn-success w-100" onClick={handleSave}>
              {isEditing ? 'Update' : 'Add'}
            </button>

          </motion.div>
        </div>
      )}

      {/* 💳 Transaction Modal  */}
      <AddTransactionModal
        show={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
        accounts={accounts}
        categories={categories} 
        fetchAccounts={fetchAccounts}
      />


    </div>
  );
};

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
  }),
  singleValue: (styles) => ({ ...styles, color: '#fff' }),
  menu: (styles) => ({ ...styles, backgroundColor: '#1a1a1a' }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#2a2a2a' : '#1a1a1a',
    color: '#fff',
  }),
  placeholder: (styles) => ({ ...styles, color: 'rgba(255,255,255,0.7)' })
};


export default Home;
