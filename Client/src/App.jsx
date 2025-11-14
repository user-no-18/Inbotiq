import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/SignIn';
import Dashboard from './Pages/DashBoard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;