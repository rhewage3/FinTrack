import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Home from './pages/Home'; // you can create this as a placeholder now
import Records from './pages/Records'; // placeholder
import PlannedPayments from './pages/PlannedPayments'; // placeholder
import MainLayout from './layout/MainLayout';


function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signin />} />

      {/* App Pages with Sidebar */}
      <Route path="/dashboard" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
        <Route path="/records" element={
          <MainLayout>
            <Records />
          </MainLayout>
        } />
        <Route path="/planned-payments" element={
          <MainLayout>
            <PlannedPayments />
          </MainLayout>
        } />

    </Routes>
   </Router>
  );


}

export default App
