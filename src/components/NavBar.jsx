import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from "../assets/the-Literaalley-logo.png";

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
    <nav className="navbar navbar-expand-lg bg-light shadow-sm px-3">
      <div className="container d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="The Literaalley logo"
            height="50"
            className="me-2 rounded"
            style={{ objectFit: "contain" }}
          />
          <span className="fw-bold fs-4 text-success">The Literaalley</span>
        </Link>

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
      </div>
    </nav>
  );
}