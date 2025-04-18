import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Signin  from './pages/Signin';


function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signin />} />
    </Routes>
   </Router>
  );


}

export default App
