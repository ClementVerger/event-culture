import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api/api';
import EventForm from '../components/EventForm';
import { AuthContext } from '../context/AuthContext';
import '../styles/EventPage.css';

function EventPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchLieu, setSearchLieu] = useState('');
  const [lieux, setLieux] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null); // Ajouté
  const history = useHistory();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
    fetchLieux();
  }, []);

  const fetchEvents = () => {
    api.get('/api/events')
      .then(response => {
        setEvents(response.data);
        setFilteredEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  const fetchLieux = () => {
    api.get('/api/lieux')
      .then(response => {
        setLieux(response.data);
      })
      .catch(error => {
        console.error('Error fetching lieux:', error);
      });
  };

  const handleEdit = (eventId) => {
    setSelectedEventId(eventId);
  };

  const handleDelete = async (eventId) => {
    try {
      await api.delete(`/api/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSuccess = () => {
    setSelectedEventId(null);
    fetchEvents();
  };

  const handleParticipate = async (eventId) => {
    try {
      await api.post('/api/participants', { id_event: eventId });
      setEvents(prevEvents => prevEvents.map(event => {
        if (event.id_event === eventId) {
          return { ...event, participants: [...(event.participants || []), { id_user: user?.id }] };
        }
        return event;
      }));
      console.log('Participation successful');
    } catch (error) {
      console.error('Error participating in event:', error);
      setError(error.response ? error.response.data.error : 'Erreur lors de la participation à l\'événement.'); // Ajouté
    }
  };

  const handleUnparticipate = async (eventId) => {
    try {
      await api.delete(`/api/participants/${eventId}`);
      setEvents(prevEvents => prevEvents.map(event => {
        if (event.id_event === eventId) {
          return { ...event, participants: (event.participants || []).filter(p => p.id_user !== user?.id) };
        }
        return event;
      }));
      console.log('Unparticipation successful');
    } catch (error) {
      console.error('Error unparticipating in event:', error);
      setError(error.response ? error.response.data.error : 'Erreur lors de la désinscription de l\'événement.'); // Ajouté
    }
  };

  const handleShare = (eventId) => {
    const event = events.find(event => event.id_event === eventId);
    const shareUrl = `${window.location.origin}/event/${eventId}`;
    navigator.clipboard.writeText(shareUrl);
    alert(`Lien de l'événement "${event.titre}" copié dans le presse-papiers : ${shareUrl}`);
  };

  const handleSearch = () => {
    const filtered = events.filter(event => {
      const matchesSearchTerm = event.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = searchDate ? new Date(event.date_debut).toLocaleDateString() === new Date(searchDate).toLocaleDateString() : true;
      const matchesType = searchType ? event.type === searchType : true;
      const matchesLieu = searchLieu ? event.id_lieu === parseInt(searchLieu) : true;
      return matchesSearchTerm && matchesDate && matchesType && matchesLieu;
    });
    setFilteredEvents(filtered);
  };

  const handleFavorite = (eventId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(eventId)) {
        return prevFavorites.filter(id => id !== eventId);
      } else {
        return [...prevFavorites, eventId];
      }
    });
  };

  const handleViewEvent = (eventId) => {
    history.push(`/event/${eventId}`);
  };

  return (
    <div className="event-page">
      <h1>Programme de l'événement</h1>
      <EventForm eventId={selectedEventId} onSuccess={handleSuccess} />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom ou description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          placeholder="Rechercher par date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="">Sélectionner un type</option>
          <option value="conférence">Conférence</option>
          <option value="atelier">Atelier</option>
          <option value="concert">Concert</option>
        </select>
        <select value={searchLieu} onChange={(e) => setSearchLieu(e.target.value)}>
          <option value="">Sélectionner un lieu</option>
          {lieux.map((lieu, index) => (
            <option key={`${lieu.id_lieu}-${index}`} value={lieu.id_lieu}>{lieu.nom}</option>
          ))}
        </select>
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul className="event-list">
        {filteredEvents.map((event, index) => (
          <li key={`${event.id_event}-${index}`} className={favorites.includes(event.id_event) ? 'favorite' : ''}>
            <h3>{event.titre}</h3>
            <p>{event.description}</p>
            <p>Début: {new Date(event.date_debut).toLocaleDateString()}</p>
            <p>Fin: {new Date(event.date_fin).toLocaleDateString()}</p>
            <p>Type: {event.type}</p>
            <p>Participants: {event.participants ? event.participants.length : 0}</p>
            <button onClick={() => handleEdit(event.id_event)}>Modifier</button>
            <button onClick={() => handleDelete(event.id_event)}>Supprimer</button>
            {event.participants && user && event.participants.some(p => p.id_user === user.id) ? (
              <button onClick={() => handleUnparticipate(event.id_event)}>Ne plus participer</button>
            ) : (
              <button onClick={() => handleParticipate(event.id_event)}>Participer</button>
            )}
            <button onClick={() => handleShare(event.id_event)}>Partager</button>
            <button onClick={() => handleFavorite(event.id_event)}>
              {favorites.includes(event.id_event) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
            <button onClick={() => handleViewEvent(event.id_event)}>Voir l'événement</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventPage;
