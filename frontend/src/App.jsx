import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Home from './pages/Home';
import Records from './pages/Records';
import PlannedPayments from './pages/PlannedPayments';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signin />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Records />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/planned-payments"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PlannedPayments />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
