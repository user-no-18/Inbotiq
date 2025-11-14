import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/user/current');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Welcome, {user?.fullName} ({user?.role === 'owner' ? 'Owner' : 'User'})
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Dashboard</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {user?.fullName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> {user?.mobile}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}