import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/Register.css';

function Register({ onSuccess }) {
  const [username, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/register', { username, email, password, role });
      console.log('Registration successful:', response.data);
      onSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
      // Afficher un message d'erreur
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div class="form-group">
        <label>Rôle</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;
