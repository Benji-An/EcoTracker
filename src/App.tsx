import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('ecotracker_current_user');
    const token = localStorage.getItem('ecotracker_token');
    if (user && token) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (username: string, token: string) => {
    localStorage.setItem('ecotracker_current_user', username);
    localStorage.setItem('ecotracker_token', token);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('ecotracker_current_user');
    localStorage.removeItem('ecotracker_token');
    setCurrentUser(null);
  };

  return (
    <div className="size-full bg-gradient-to-br from-green-50 to-blue-50">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard username={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}
