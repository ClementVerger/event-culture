const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Participant } = require('../config/database');

// Obtenir tous les participants
router.get('/api/participants', auth, async (req, res) => {
  try {
    const participants = await Participant.findAll();
    res.status(200).send(participants);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des participants' });
  }
});

// Obtenir une participation par son ID
router.get('/api/participants/:id', auth, async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (!participant) {
      return res.status(404).send('Participant non trouvé');
    }
    res.status(200).send(participant);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du participant' });
  }
});

// Obtenir les participations d'un utilisateur
router.get('/api/participants/user/:id', auth, async (req, res) => {
  try {
    const participations = await Participant.findAll({
      where: { id_user: req.params.id }
    });
    res.status(200).send(participations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des participations' });
  }
});

// Obtenir les participations d'un événement
router.get('/api/participants/event/:id', auth, async (req, res) => {
  try {
    const participations = await Participant.findAll({
      where: { id_event: req.params.id }
    });
    res.status(200).send(participations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des participations' });
  }
});

// Obtenir la participation d'un utilisateur pour un événement
router.get('/api/participants/user/:idUser/event/:idEvent', auth, async (req, res) => {
  try {
    const participation = await Participant.findOne({
      where: { id_user: req.params.idUser, id_event: req.params.idEvent }
    });
    if (!participation) {
      return res.status(404).send('Participation non trouvée');
    }
    res.status(200).send(participation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la participation' });
  } 
});

// Créer une participation
router.post('/api/participants', auth, async (req, res) => {
  const { id_user, id_event, statut } = req.body;
  try {
    const participant = await Participant.create({ id_user, id_event, statut });
    res.status(201).send(participant);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du participant' });
  }
});


// Mettre à jour un participant
router.put('/api/participants/:id', auth, async (req, res) => {
  const { id_user, id_event, statut } = req.body;
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (!participant) {
      return res.status(404).send('Participant non trouvé');
    }
    participant.id_user = id_user;
    participant.id_event = id_event;
    participant.statut = statut;
    await participant.save();
    res.status(200).send(participant);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du participant' });
  }
});

// Supprimer un participant
router.delete('/api/participants/:id', auth, async (req, res) => {
  try {
    const participant = await Participant.findByPk(req.params.id);
    if (!participant) {
      return res.status(404).send('Participant non trouvé');
    }
    await participant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du participant' });
  }
});

module.exports = router;