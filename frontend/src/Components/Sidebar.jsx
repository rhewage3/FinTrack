import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import {
    Home,
    FileText,
    CalendarCheck,
    BarChart2,
    DollarSign,
    TrendingUp,
    PieChart,
    LogOut,
    User
} from 'lucide-react';

const Sidebar = () => {
    const [showStats, setShowStats] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
      };
      




    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <h2 className="sidebar-title">FinTrack</h2>

                <ul className="sidebar-links">
                    <li>
                        <Link to="/dashboard">
                            <Home size={18} /> <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/records">
                            <FileText size={18} /> <span>Records</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/planned-payments">
                            <CalendarCheck size={18} /> <span>Planned Payments</span>
                        </Link>
                    </li>

                    {/* Statistics Dropdown */}
                    <li className="stats-section">
                        <div onClick={() => setShowStats(!showStats)} className="dropdown-toggle">
                            <BarChart2 size={18} /> <span>Statistics</span>
                        </div>
                        {showStats && (
                            <ul className="sidebar-sub">
                                <li><Link to="/statistics/balance"><DollarSign size={16} /> Balance</Link></li>
                                <li><Link to="/statistics/cashflow"><TrendingUp size={16} /> Cash Flow</Link></li>
                                <li><Link to="/statistics/spending"><PieChart size={16} /> Spending</Link></li>
                                <li><Link to="/statistics/reports"><FileText size={16} /> Reports</Link></li>
                                <li><Link to="/statistics/assets"><User size={16} /> Assets</Link></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            <div className="sidebar-bottom">
                <hr />
                <div className="sidebar-user">
                    <span style={{fontSize: '24px'}}><User size={30} /> {user?.name || "User"}</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;
