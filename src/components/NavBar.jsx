import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/"> The Literaalley</Link>

      <div className="navbar-nav ms-auto">
        {token ? (
          <>
            <Link className="nav-link" to="/books"> Book List</Link>
            <Link className="nav-link" to="/add-book">Add Book</Link>
            <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
