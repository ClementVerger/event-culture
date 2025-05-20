import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/ParticipantsPage.css';

function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = () => {
    api.get('/api/participants')
      .then(response => {
        setParticipants(response.data);
        setFilteredParticipants(response.data);
      })
      .catch(error => {
        console.error('Error fetching participants:', error);
      });
  };

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setFilter(category);
    if (category) {
      setFilteredParticipants(participants.filter(p => p.role === category));
    } else {
      setFilteredParticipants(participants);
    }
  };

  return (
    <div className="participants-page">
      <h1>Participants</h1>
      <div className="filter-bar">
        <label>Filtrer par catégorie:</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="">Tous</option>
          <option value="intervenant">Intervenant</option>
          <option value="participant">Participant</option>
          <option value="artiste">Artiste</option>
        </select>
      </div>
      <ul className="participant-list">
        {filteredParticipants.map(participant => (
          <li key={participant.id_user}>
            <img src={participant.photo} alt={participant.nom} className="participant-photo" />
            <h3>{participant.nom}</h3>
            <p>{participant.bibliographie}</p>
            <h4>Événements:</h4>
            <ul>
              {participant.events.map(event => (
                <li key={event.id_event}>{event.titre}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantsPage;
