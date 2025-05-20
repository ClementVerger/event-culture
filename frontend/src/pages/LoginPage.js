import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import '../styles/LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <Login />
      <div className="forgot-password">
        <Link to="/reset-password">Mot de passe oublié ?</Link>
      </div>
    </div>
  );
}

export default LoginPage;
