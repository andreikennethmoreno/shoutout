import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Make sure this path is correct

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protect the /user route */}
        <Route 
          path="/user" 
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
