import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import '../styles/EventParticipantsPage.css';

function EventParticipantsPage() {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, [id]);

  const fetchParticipants = () => {
    api.get(`/api/events/${id}/participants`)
      .then(response => {
        setParticipants(response.data);
      })
      .catch(error => {
        console.error('Error fetching participants:', error);
      });
  };

  return (
    <div className="event-participants-page">
      <h1>Participants de l'événement</h1>
      <ul className="participant-list">
        {participants.map(participant => (
          <li key={participant.id_user}>
            <img src={participant.photo} alt={participant.nom} className="participant-photo" />
            <h3>{participant.nom}</h3>
            <p>{participant.bibliographie}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventParticipantsPage;
