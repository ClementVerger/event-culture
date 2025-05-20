const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Comment } = require('../config/database');

// Obtenir tous les commentaires
router.get('/api/comments', auth, async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
  }
});

// Obtenir un commentaire par ID
router.get('/api/comments/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).send('Commentaire non trouvé');
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du commentaire' });
  }
});

// Créer un commentaire
router.post('/api/comments', auth, async (req, res) => {
  const { id_user, id_event, commentaire } = req.body;
  try {
    const comment = await Comment.create({ id_user, id_event, commentaire });
    res.status(201).send(comment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
  }
});

// Mettre à jour un commentaire
router.put('/api/comments/:id', auth, async (req, res) => {
  const { id_user, id_event, commentaire } = req.body;
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).send('Commentaire non trouvé');
    }
    comment.id_user = id_user;
    comment.id_event = id_event;
    comment.commentaire = commentaire;
    await comment.save();
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du commentaire' });
  }
});

// Supprimer un commentaire
router.delete('/api/comments/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).send('Commentaire non trouvé');
    }
    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
  }
});

module.exports = router;