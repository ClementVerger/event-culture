import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList'
import '../styles/EventPage.css';
import EventForm from '../components/EventForm';
import api from '../api/api';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState([]);
  const [lieux, setLieux] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchLieu, setSearchLieu] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // permet de récupérer les données au chargement
  useEffect(() => {
    fetchEvents();
    fetchLieux();
  }, []);

  const fetchEvents = async () => {
    api.get('/api/events')
      .then(response => {
        setEvents(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  const fetchLieux = async () => {
    api.get('/api/lieux')
      .then(response => {
        setLieux(response.data);
      })
      .catch(error => {
        console.error('Error fetching lieux:', error);
      });
  };

  // permet d'actualiser la liste filtrée en temps réel sans modifier events
  useEffect(() => {
    handleSearch();
  }, [searchTerm, searchDate, searchType, searchLieu, events]);

  const handleSearch = () => {
    const filtered = events.filter(event => {
      const matchesSearchTerm = event.titre.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = searchDate ? new Date(event.date_debut).toLocaleDateString() === new Date(searchDate).toLocaleDateString() : true;
      const matchesType = searchType ? event.type === searchType : true;
      const matchesLieu = searchLieu ? event.id_lieu === parseInt(searchLieu) : true;
      return matchesSearchTerm && matchesDate && matchesType && matchesLieu;
    });
    setFilteredEvents(filtered);
  };

  const handleEditEvent = (event) => {
    setEvent(event);
    setShowModal(true);
  };

  const handleDeleteEvent = async (event) => {
    setEvent(event);
    if (!event.id) {
      console.error("Evenement non trouvé.");
      return;
    }
    try {
      await api.delete(`/api/events/${event.id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }

  }

  const handleAddEvent = () => {
    setEvent('');
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };


  return (
    <div className='flex flex-nowrap w-full h-[80vh]'>
      <EventList
        events={filteredEvents}
        lieux={lieux}
        onAddEvent={handleAddEvent}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
        searchType={searchType}
        setSearchType={setSearchType}
        searchLieu={searchLieu}
        setSearchLieu={setSearchLieu}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />

      {/* }

      {/* Afficher EventForm en modal si showModal est true */}
      {showModal && (
        <EventForm
          event={event}
          lieux={lieux}
          onClose={handleClose}
          onEventUpdate={fetchEvents}
        />
      )}
    </div>
  );
}

export default EventPage;
