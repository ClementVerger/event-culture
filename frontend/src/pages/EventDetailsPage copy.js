import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import '../styles/EventDetailsPage.css';

function EventDetailsPage() {
  const { id } = useParams(); // Récupérer l'ID de l'événement depuis l'URL
  const [eventInfo, setEventInfo] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [participants, setParticipants] = useState([]); // Ajouté

  useEffect(() => {
    fetchEventInfo();
    fetchComments();
    fetchParticipants(); // Ajouté
  }, [id]);

  const fetchEventInfo = () => {
    api.get(`/api/events/${id}`)
      .then(response => {
        setEventInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching event info:', error);
      });
  };

  const fetchComments = () => {
    api.get(`/api/comments?eventId=${id}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  const fetchParticipants = () => {
    api.get(`/api/events/${id}/participants`)
      .then(response => {
        setParticipants(response.data.slice(-10)); // Afficher les 10 derniers participants
      })
      .catch(error => {
        console.error('Error fetching participants:', error);
      });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/comments', { commentaire: comment, id_event: id });
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await api.delete(`/api/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!eventInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details-page">
      <h1>{eventInfo.titre}</h1>
      <div className="event-logo">
        <img src={eventInfo.logo} alt="Logo de l'événement" />
      </div>
      <div className="event-details">
        <h2>Vision et Objectifs</h2>
        <p>{eventInfo.description}</p>
        <h2>Informations sur le lieu</h2>
        <p>Lieu: {eventInfo.lieu.nom}</p>
        <p>Adresse: {eventInfo.lieu.adresse}</p>
        <h2>Durée de l'événement</h2>
        <p>Début: {new Date(eventInfo.date_debut).toLocaleDateString()}</p>
        <p>Fin: {new Date(eventInfo.date_fin).toLocaleDateString()}</p>
      </div>
      <div className="call-to-action">
        <button>
          <Link to="/signup">Inscription</Link>
        </button>
        <button>
          <Link to="/tickets">Billetterie</Link>
        </button>
      </div>
      <div className="participants-section"> {/* Ajouté */}
        <h2>Derniers participants</h2>
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
      <div className="comments-section">
        <h2>Commentaires</h2>
        <form onSubmit={handleCommentSubmit}>
          <div className="form-group">
            <label>Commentaire</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Ajouter un commentaire</button>
        </form>
        <ul className="comment-list">
          {comments.map(comment => (
            <li key={comment.id_comment}>
              <p>{comment.commentaire}</p>
              <button onClick={() => handleCommentDelete(comment.id_comment)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventDetailsPage;
