import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">EventCulture</Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/event">Events</Link>
            <Link to="/program">Programes</Link>
            <Link to="/site">Sites</Link>
            <Link to="/gallery">Galerie</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/speakers">Intervenants</Link>
            <Link to="/lieux">Lieux</Link>
            <button onClick={logout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/signup">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
