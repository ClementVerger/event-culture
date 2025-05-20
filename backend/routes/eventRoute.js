const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Event, Lieu, User, Participant } = require('../config/database');
const dayjs = require("dayjs");
require("dayjs/locale/fr"); // Importer le français
dayjs.locale("fr");

// Obtenir tous les événements
router.get('/api/events', auth, async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Lieu,
          as: 'lieu',
          attributes: ["nom"]
        },
        {
          model: User,
          as: 'createur',
          attributes: ['username']
        }
      ]
    });

    const formattedEvents = events.map(event => ({
      ...event.toJSON(), // Convertir l'objet Sequelize en objet JS

    }));
    res.status(200).send(formattedEvents);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
  }
});

// Obtenir un événement par ID
router.get('/api/events/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Lieu,
          as: 'lieu',
          attributes: ["nom", "adresse"]
        },
        {
          model: User,
          as: 'createur',
          attributes: ['username']
        }
      ]
    });

    if (!event) {
      return res.status(404).send('Evénement non trouvé');
    }

     // Récupérer le nombre de participants
     const nombreParticipants = await Participant.count({
      where: {
        id_event: req.params.id
      }
    });

    const formattedEvent = {
      ...event.toJSON(), // Convertit l'objet Sequelize en objet JS
      nombreParticipants: nombreParticipants
    };

    res.status(200).send(formattedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'événement' });
  }
});

// Créer un événement
router.post('/api/events', auth, async (req, res) => {
  const { titre, description, date_debut, date_fin, id_lieu, id_createur } = req.body;
  try {
    const event = await Event.create({ titre, description, date_debut, date_fin, id_lieu, id_createur });
    res.status(201).send(event);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'événement' });
  }
});

// Participer à un événement
router.post('/api/events/:id/participate', auth, async (req, res) => {
  const { id_user, statut } = req.body;
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).send('Evénement non trouvé');
    }
    const participant = await Participant.create({ id_user, id_event: event.id , statut});
    res.status(201).send(participant);
  } catch (error) {
  }
});

// Se désinscrire d'un événement
router.delete('/api/events/:id/participate', auth, async (req, res) => {
  const { id_user } = req.body;
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).send('Evénement non trouvé');
    }
    const participant = await Participant.findOne({
      where: { id_user, id_event: event.id }
    });
    if (!participant) {
      return res.status(404).send('Participation non trouvée');
    }
    await participant.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la participation' });
  }
});

// Mettre à jour un événement
router.put('/api/events/:id', auth, async (req, res) => {
  const { titre, description, date_debut, date_fin, id_lieu } = req.body;
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).send('Evénement non trouvé');
    }
    event.titre = titre;
    event.description = description;
    event.date_debut = date_debut;
    event.date_fin = date_fin;
    event.id_lieu = id_lieu;
    event.id_lieu = id_lieu;
    await event.save();
    res.status(200).send(event);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'événement' });
  }
});

// Supprimer un événement
router.delete('/api/events/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).send('Evénement non trouvé');
    }
    await event.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement' });
  }
});

module.exports = router;