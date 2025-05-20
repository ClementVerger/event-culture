import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/EventForm.css';

function EventForm({ eventId, onSuccess }) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [lieuId, setLieuId] = useState('');
  const [lieux, setLieux] = useState([]);
  const [creatorId, setCreatorId] = useState('');

  useEffect(() => {
    let isMounted = true;

    if (eventId) {
      api.get(`/api/events/${eventId}`)
        .then(response => {
          if (isMounted) {
            const event = response.data;
            setTitre(event.titre);
            setDescription(event.description);
            setDateDebut(event.date_debut);
            setDateFin(event.date_fin);
            setLieuId(event.id_lieu);
            setCreatorId(event.id_createur);
          }
        })
        .catch(error => {
          console.error('Error fetching event:', error);
        });
    } else {
      // Récupérer l'ID de l'utilisateur connecté
      const token = localStorage.getItem('token'); // Supposons que le token JWT est stocké dans localStorage
      if (token) {
        api.get('/api/current_user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            if (isMounted) {
              setCreatorId(response.data.id);
            }
          })
          .catch(error => {
            console.error('Error fetching current user:', error);
          });



        api.get('/api/lieux')
          .then(response => {
            if (isMounted) {
              setLieux(response.data);
            }
          })
          .catch(error => {
            console.error('Error fetching lieux:', error);
          });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const event = { titre, description, date_debut: dateDebut, date_fin: dateFin, id_lieu: Number(lieuId), id_createur: creatorId };
      if (eventId) {
        await api.put(`/api/events/${eventId}`, event);
      } else {
        await api.post('/api/events', event);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{eventId ? 'Modifier l\'événement' : 'Créer un événement'}</h2>
      <div className="form-group">
        <label>Titre</label>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Date de début</label>
        <input
          type="date"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Date de fin</label>
        <input
          type="date"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Lieu</label>
        <select value={lieuId} onChange={(e) => setLieuId(e.target.value)} required>
          <option value="">Sélectionner un lieu</option>
          {lieux.map((lieu) => (
            <option key={lieu.id} value={lieu.id}> {lieu.nom} </option>
          ))}
        </select>
      </div>



      <button type="submit">Enregistrer</button>
    </form>
  );
}

export default EventForm;