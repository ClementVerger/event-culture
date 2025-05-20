import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/CommentsPage.css';

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    api.get('/api/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/comments', { commentaire: comment });
      setComment('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await api.delete(`/api/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comments-page">
      <h1>Commentaires et avis</h1>
      <form onSubmit={handleSubmit}>
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
            <button onClick={() => handleDelete(comment.id_comment)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsPage;
