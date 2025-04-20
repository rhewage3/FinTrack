import React, { useState, useEffect } from 'react';
import './Records.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import api from '../api';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('7d');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  const handleToggle = (id) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await api.get('/transactions');
        setRecords(res.data); // No need to sort here
      } catch (err) {
        console.error('Failed to load transactions', err);
      }
    };


    fetchRecords();
  }, []);

  const borderColors = {
    income: '#1abc9c',
    expense: '#e74c3c',
    transfer: '#3498db'
  };

  const totalPages = Math.ceil(records.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = [...records]
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort newest first
    .slice(indexOfFirst, indexOfLast);


  return (
    <div className="records-container">
      <div className="records-top-bar">
        <div className="records-filters">
          {['7d', '30d', '6m', '1y'].map(range => (
            <button
              key={range}
              className={`filter-btn ${filter === range ? 'active' : ''}`}
              onClick={() => setFilter(range)}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="pagination-controls">
          <button
            className="page-btn arrow"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ⬅️
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-btn arrow"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            ➡️
          </button>
        </div>
      </div>

      <div className="records-list">
        {currentRecords.map(tx => (
          <div
            key={tx.id}
            className="record-card"
            style={{
              borderLeft: `4px solid ${borderColors[tx.type]}`,
              boxShadow: `0 0 10px ${borderColors[tx.type]}55`
            }}
          >
            <div className="record-main" onClick={() => handleToggle(tx.id)}>
              <div>
                <strong>{tx.type.toUpperCase()}</strong> - Rs. {tx.amount}
              </div>
              <div>{tx.date.split('T')[0]}</div>
              <div className="expand-icon">
                {expanded === tx.id ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>

            {expanded === tx.id && (
              <div className="record-details">
                {/* Category (for expense and income only) */}
                {(tx.type !== 'transfer' && tx.category?.name) && (
                  <p>
                    <strong>Category:</strong>{' '}
                    {tx.category?.parent?.name
                      ? `${tx.category.parent.name} → `
                      : ''}
                    {tx.category.name}
                  </p>
                )}

                {/* From and To Accounts */}
                {tx.type === 'expense' && tx.fromAccount?.name && (
                  <p><strong>From:</strong> {tx.fromAccount.name}</p>
                )}

                {tx.type === 'income' && tx.toAccount?.name && (
                  <p><strong>To:</strong> {tx.toAccount.name}</p>
                )}

                {tx.type === 'transfer' && (
                  <>
                    {tx.fromAccount?.name && (
                      <p><strong>From:</strong> {tx.fromAccount.name}</p>
                    )}
                    {tx.toAccount?.name && (
                      <p><strong>To:</strong> {tx.toAccount.name}</p>
                    )}
                  </>
                )}

                {/* Label */}
                {tx.label && <p><strong>Label:</strong> {tx.label}</p>}

                {/* Note */}
                {tx.note && <p><strong>Note:</strong> {tx.note}</p>}

                {/* Date */}
                <p><strong>Date:</strong> {tx.date.split('T')[0]}</p>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Records;
