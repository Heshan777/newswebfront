import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#333333ff', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
          NewsApp
        </Link>
      </div>
      <div>
        <Link to="/" style={{ margin: '0 10px', color: '#ddd' }}>Feed</Link>
        <Link to="/trending" style={{ margin: '0 10px', color: '#ddd' }}>Trending</Link>
        
        {user ? (
          <>
            <Link to="/bookmarks" style={{ margin: '0 10px', color: '#ddd' }}>Bookmarks</Link>
            <span style={{ margin: '0 10px', color: '#88fa88' }}>Hi, {user.username}</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ margin: '0 10px', color: '#ddd' }}>Login</Link>
            <Link to="/register" style={{ margin: '0 10px', color: '#ddd' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;