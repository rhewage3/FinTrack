import React, { useState } from 'react';
import './AddTransactionModal.css';
import Select from 'react-select';
import { toast } from 'react-toastify';
import api from '../api';

const AddTransactionModal = ({ show, onClose, accounts, categories, fetchAccounts }) => {
    const [type, setType] = useState('expense');
    const [mainCategoryId, setMainCategoryId] = useState('');
    const [form, setForm] = useState({
        amount: '',
        categoryId: '',
        fromAccountId: '',
        toAccountId: '',
        note: '',
        label: '',
        date: new Date().toISOString().split('T')[0],
    });

    const handleChange = (field, value) => {
        if (field === 'categoryId' && value !== null && typeof value === 'string') {
            value = Number(value);
        }
        setForm(prev => ({ ...prev, [field]: value }));
    };


    const handleSave = async () => {
        if (
            !form.amount ||
            (type !== 'transfer' && !form.categoryId) ||
            (type === 'expense' && !form.fromAccountId) ||
            (type === 'income' && !form.toAccountId) ||
            (type === 'transfer' && (!form.fromAccountId || !form.toAccountId))
        ) {
            toast.error('Please fill in required fields');
            return;
        }



        const payload = {
            ...form,
            toAccountId: form.toAccountId || null,
            fromAccountId: form.fromAccountId || null,
            categoryId: form.categoryId ? Number(form.categoryId) : 9999,
            type,
        };

        try {
            await api.post('/transactions', payload);
            toast.success('Transaction added ✅');
            onClose();

            //  Refresh account balances
            if (fetchAccounts) fetchAccounts();
        } catch (err) {
            console.error(err);
            toast.error('Failed to save transaction ❌');
        }
    };


    if (!show) return null;

    const categoryIcons = {
        // Main Categories
        "Food and Drinks": "🍽️",
        "Shopping": "🛍️",
        "Housing": "🏠",
        "Transportation": "🚌",
        "Vehicle": "🚗",
        "Life and Entertainment": "🎉",
        "Communication and PC": "💻",
        "Financial Expenses": "💸",
        "Investments": "📈",
        "Others": "🗂️",
        "Income": "💰",

        // Subcategories
        "Bar": "🍺",
        "Cafe": "☕",
        "Groceries": "🛒",
        "Restaurant": "🍽️",
        "Fast Food": "🍔",

        "Clothes & Shoes": "👕",
        "Drug Store - Chemist": "💊",
        "Electronics - Accessories": "🔌",
        "Free Time": "⏳",
        "Gifts - Joy": "🎁",
        "Health and Beauty": "💅",
        "Home and Garden": "🪴",
        "Jewels": "💎",
        "Kids": "🧸",
        "Pets and Animals": "🐾",
        "Stationary and Tools": "🛠️",

        "Energy - Utilities": "💡",
        "Maintenance and Repairs": "🔧",
        "Mortgage": "🏦",
        "Property Insurance": "🧾",
        "Rent": "💳",
        "Service": "🛎️",

        "Business Trips": "✈️",
        "Long Distance": "🚄",
        "Public Transport": "🚉",
        "Taxi": "🚕",

        "Fuel": "⛽",
        "Leasing": "📄",
        "Parking": "🅿️",
        "Rentals": "🏘️",
        "Vehicle Insurance": "🛡️",
        "Vehicle Maintenance": "🧰",

        "Active Sport - Fitness": "🏋️",
        "Alcohol - Tobacco": "🚬",
        "Books - Audio - Subscriptions": "📚",
        "Charity - Gifts": "❤️",
        "Culture - Sports Events": "🎭",
        "Education - Development": "🎓",
        "Healthcare - Doctor": "🩺",
        "Hobbies": "🎨",
        "Holiday - Trips - Hotels": "🏖️",
        "Life Events": "🎊",
        "Lottery - Gambling": "🎰",
        "TV - Streaming": "📺",
        "Wellness - Beauty": "💆",

        "Internet": "🌐",
        "Phone - Cellphone": "📱",
        "Postal Service": "📬",
        "Software - Apps - Games": "🎮",

        "Advisory": "🗣️",
        "Charges - Fees": "💵",
        "Child Support": "🧒",
        "Fines": "⚖️",
        "Insurance": "🛡️",
        "Loan - Interest": "📉",
        "Taxes": "🧾",

        "Collections": "🧱",
        "Financial Investments": "💹",
        "Realty": "🏘️",
        "Savings": "🏦",
        "Vehicle - Chattels": "🚙",

        "Checks - Coupons": "🧾",
        "Dues and Grants": "🎓",
        "Gifts": "🎁",
        "Interests and Dividends": "📊",
        "Lending and Renting": "🤝",
        "Lottery and Gambling": "🎲",
        "Refunds": "🔁",
        "Rental Income": "🏡",
        "Sale": "🛍️",
        "Wage and Invoices": "🧾"
    };


    const mainCategories = categories.filter(cat => cat.type === type && !cat.parentId);
    const subCategories = categories.filter(cat => cat.parentId === mainCategoryId);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="transaction-modal" onClick={(e) => e.stopPropagation()}>
                <h4 className="text-white mb-3">Add Transaction</h4>

                <div className="type-toggle mb-3">
                    {['expense', 'income', 'transfer'].map(t => (
                        <button
                            key={t}
                            className={`btn btn-sm me-2 ${type === t ? 'btn-primary' : 'btn-outline-light'}`}
                            onClick={() => {
                                setType(t);
                                setMainCategoryId('');
                                handleChange('categoryId', '');
                            }}
                        >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>

                <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                />

                {type === 'expense' && (
                    <Select
                        className="mb-2"
                        styles={customStyles}
                        placeholder="From Account"
                        options={accounts.map(a => ({ value: a.id, label: a.name }))}
                        onChange={(opt) => handleChange('fromAccountId', opt?.value)}
                    />
                )}

                {type === 'income' && (
                    <Select
                        className="mb-2"
                        styles={customStyles}
                        placeholder="To Account"
                        options={accounts.map(a => ({ value: a.id, label: a.name }))}
                        onChange={(opt) => handleChange('toAccountId', opt?.value)}
                    />
                )}



                {type === 'transfer' && (
                    <>
                        <Select
                            className="mb-2"
                            styles={customStyles}
                            placeholder="From Account"
                            options={accounts.map(a => ({ value: a.id, label: a.name }))}
                            onChange={(opt) => handleChange('fromAccountId', opt?.value)}
                        />

                        <Select
                            className="mb-2"
                            styles={customStyles}
                            placeholder="To Account"
                            options={accounts.map(a => ({ value: a.id, label: a.name }))}
                            onChange={(opt) => handleChange('toAccountId', opt?.value)}
                        />
                    </>
                )}


                {type !== 'transfer' && (
                    <>
                        {/* Main Category */}
                        <Select
                            className="mb-2"
                            styles={customStyles}
                            placeholder="Main Category"
                            options={mainCategories.map(c => ({
                                value: c.id,
                                label: `${categoryIcons[c.name] || ''} ${c.name}`
                            }))}
                            onChange={(opt) => {
                                setMainCategoryId(opt?.value || '');
                                handleChange('categoryId', '');
                            }}
                        />

                        {/* Subcategory */}
                        <Select
                            className="mb-2"
                            styles={customStyles}
                            placeholder="Subcategory"
                            options={subCategories.map(c => ({
                                value: c.id,
                                label: `${categoryIcons[c.name] || ''} ${c.name}`
                            }))}
                            value={subCategories.find(c => c.id === form.categoryId) ? {
                                value: form.categoryId,
                                label: `${categoryIcons[subCategories.find(c => c.id === form.categoryId)?.name] || ''} ${subCategories.find(c => c.id === form.categoryId)?.name}`
                            } : null}
                            onChange={(opt) => handleChange('categoryId', opt?.value)}
                            isDisabled={!mainCategoryId}
                        />
                    </>
                )}

                <input
                    type="date"
                    className="form-control mb-2"
                    value={form.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                />

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Label (optional)"
                    value={form.label}
                    onChange={(e) => handleChange('label', e.target.value)}
                />

                <textarea
                    className="form-control mb-3"
                    placeholder="Note (optional)"
                    value={form.note}
                    onChange={(e) => handleChange('note', e.target.value)}
                />

                <button className="btn btn-success w-100" onClick={handleSave}>
                    Save
                </button>
            </div>
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

export default AddTransactionModal;
