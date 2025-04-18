import React from 'react';
import Sidebar from '../Components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
