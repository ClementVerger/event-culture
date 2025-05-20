import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventDetails from '../components/EventDetails';
import api from '../api/api';
import { getUserId } from '../utils/auth';

function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const [isUserParticipating, setIsUserParticipating] = useState(false);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/events/${id}`);
      setEvent(response.data);
    } catch (err) {
      setError("Erreur lors du chargement de l'événement");
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkParticipation = async () => {
    try {
      const userId = await getUserId();
      if (!userId) return;

      await api.get(`/api/participants/user/${userId}/event/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      setIsUserParticipating(true);
    } catch (error) {
      // Ne logger que les vraies erreurs (pas les 404)
      if (!error.response || (error.response.status !== 404)) {
        console.error('Erreur lors de la vérification de la participation:', error);
      }
      setIsUserParticipating(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchEventDetails();
      await checkParticipation();
    };
    loadData();
  }, [id]);

  const handleParticipate = async () => {
    try {
      const userId = await getUserId();
      if (!userId) {
        setError("Vous devez être connecté pour participer");
        return;
      }
      if (isUserParticipating) {
        // Désinscription - utilisons le même format d'URL que pour la participation
        await api.delete(`/api/events/${id}/participate/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          data: {  // Important : pour DELETE, il faut utiliser 'data' pour envoyer un body
            id_user: userId
          }
        });
      } else {
        // Inscription
        await api.post(`/api/events/${id}/participate`,
          {
            id_user: userId,
            statut: 1
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }

      // Mettre à jour l'état de participation et les détails de l'événement
      await checkParticipation();
      await fetchEventDetails();
    } catch (error) {
      console.error('Erreur lors de la participation:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  }

  if (!event) {
    return <div className="flex items-center justify-center min-h-screen">Événement non trouvé</div>;
  }

  return <EventDetails event={event} onParticipate={handleParticipate} isParticipating={isUserParticipating} />;
}

export default EventDetailsPage;
