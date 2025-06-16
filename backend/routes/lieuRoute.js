const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Lieu } = require('../config/database');

// Obtenir tous les lieux
router.get('/api/lieux', async (req, res) => {
  try {
    const lieux = await Lieu.findAll();
    res.status(200).send(lieux);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des lieux' });
  }
});

// Obtenir un lieu par ID
router.get('/api/lieux/:id', auth, async (req, res) => {
  try {
    const lieu = await Lieu.findByPk(req.params.id);
    if (!lieu) {
      return res.status(404).send('Lieu non trouvé');
    }
    res.status(200).send(lieu);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du lieu' });
  }
});

// Créer un lieu
router.post('/api/lieux', auth, async (req, res) => {
  const { nom, adresse, latitude, longitude, description } = req.body;
  try {
    const lieu = await Lieu.create({ nom, adresse, latitude, longitude, description });
    res.status(201).send(lieu);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du lieu' });
  }
});

// Mettre à jour un lieu
router.put('/api/lieux/:id', auth, async (req, res) => {
  const { nom, adresse, latitude, longitude, description } = req.body;
  try {
    const lieu = await Lieu.findByPk(req.params.id);
    if (!lieu) {
      return res.status(404).send('Lieu non trouvé');
    }
    lieu.nom = nom;
    lieu.adresse = adresse;
    lieu.latitude = latitude;
    lieu.longitude = longitude;
    lieu.description = description;
    await lieu.save();
    res.status(200).send(lieu);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du lieu' });
  }
});

// Supprimer un lieu
router.delete('/api/lieux/:id', auth, async (req, res) => {
  try {
    const lieu = await Lieu.findByPk(req.params.id);
    if (!lieu) {
      return res.status(404).send('Lieu non trouvé');
    }
    await lieu.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du lieu' });
  }
});
module.exports = router;
