import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    try {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      
      // Update auth state
      logout();
      
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
    >
      <LogOut className="h-5 w-5" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;