import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import './HomePage.css';

function HomePage() {
  const [eventInfo, setEventInfo] = useState(null);

  useEffect(() => {
    fetchEventInfo();
  }, []);

  const fetchEventInfo = () => {
    api.get('/api/events/1') // Supposons que l'ID de l'événement principal soit 1
      .then(response => {
        setEventInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching event info:', error);
      });
  };

  if (!eventInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <h1>Bienvenue à {eventInfo.titre}</h1>
      <div className="event-details">
        <h2>Vision et Objectifs</h2>
        <p>{eventInfo.description}</p>
        <h2>Informations sur le lieu</h2>
        <p>Lieu: {eventInfo.lieu.nom}</p>
        <p>Adresse: {eventInfo.lieu.adresse}</p>
        <h2>Durée de l'événement</h2>
        <p>Début: {new Date(eventInfo.date_debut).toLocaleDateString()}</p>
        <p>Fin: {new Date(eventInfo.date_fin).toLocaleDateString()}</p>
        <h2>Historique de l'événement</h2>
        <p>{eventInfo.historique}</p>
      </div>
      <div className="auth-buttons">
        <button>
          <Link to="/login">Connexion</Link>
        </button>
        <button>
          <Link to="/signup">Inscription</Link>
        </button>
      </div>
      <div className="links">
        <Link to="/event">Voir le programme de l'événement</Link>
        <Link to="/participants">Voir les participants</Link>
        <Link to="/map">Voir le parcours</Link>
        <Link to="/gallery">Voir la galerie</Link>
        <Link to="/comments">Laisser un commentaire</Link>
        <Link to="/share">Partager sur les réseaux sociaux</Link>
        <Link to="/notifications">Voir les notifications</Link>
        <Link to="/speakers">Voir les intervenants</Link>
      </div>
    </div>
  );
}

export default HomePage;