const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Oeuvre } = require('../config/database');

// Obtenir toutes les oeuvres
router.get('/api/oeuvres', auth, async (req, res) => {
  try {
    const oeuvres = await Oeuvre.findAll();
    res.status(200).send(oeuvres);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des oeuvres' });
  }
});

// Obtenir une oeuvre par ID
router.get('/api/oeuvres/:id', auth, async (req, res) => {
  try {
    const oeuvre = await Oeuvre.findByPk(req.params.id);
    if (!oeuvre) {
      return res.status(404).send('Oeuvre non trouvée');
    }
    res.status(200).send(oeuvre);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'oeuvre' });
  }
});

// Créer une oeuvre
router.post('/api/oeuvres', auth, async (req, res) => {
  const { id_user, titre, type, description, prix, image } = req.body;
  try {
    const oeuvre = await Oeuvre.create({ id_user, titre, type, description, prix, image });
    res.status(201).send(oeuvre);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'oeuvre' });
  }
});

// Mettre à jour une oeuvre
router.put('/api/oeuvres/:id', auth, async (req, res) => {
  const { id_user, titre, type, description, prix, image } = req.body;
  try {
    const oeuvre = await Oeuvre.findByPk(req.params.id);
    if (!oeuvre) {
      return res.status(404).send('Oeuvre non trouvée');
    }
    
    oeuvre.id_user = id_user;
    oeuvre.titre = titre;
    oeuvre.type = type;
    oeuvre.description = description;
    oeuvre.prix = prix;
    oeuvre.image = image;

    await oeuvre.save();
    res.status(200).send(oeuvre);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'oeuvre' });
  }
});

// Supprimer une oeuvre
router.delete('/api/oeuvres/:id', auth, async (req, res) => {
  try {
    const oeuvre = await Oeuvre.findByPk(req.params.id);
    if (!oeuvre) {
      return res.status(404).send('Oeuvre non trouvée');
    }
    await oeuvre.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'oeuvre' });
  }
});

module.exports = router;