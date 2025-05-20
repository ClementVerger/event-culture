import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/UserProfile.css';

function UserProfile() {
  const { isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [bibliographie, setBibliographie] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      api.get('/api/user/profile')
        .then(response => {
          setUser(response.data);
          setNom(response.data.nom);
          setEmail(response.data.email);
          setTelephone(response.data.telephone);
          setBibliographie(response.data.bibliographie);
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/api/user/profile', { nom, email, telephone, bibliographie });
      setUser(response.data);
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>Mon Profil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            value={nom}
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
          <label>Téléphone</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Bibliographie</label>
          <textarea
            value={bibliographie}
            onChange={(e) => setBibliographie(e.target.value)}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default UserProfile;
