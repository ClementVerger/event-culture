const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Gallery } = require('../config/database');

// Obtenir toutes les galeries
router.get('/api/galleries', async (req, res) => {
  try {
    const galleries = await Gallery.findAll();
    res.status(200).send(galleries);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des galeries' });
  }
});

// Obtenir une galerie par ID
router.get('/api/galleries/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).send('Galerie non trouvée');
    }
    res.status(200).send(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la galerie' });
  }
});

// Créer une galerie
router.post('/api/galleries', auth, async (req, res) => {
  const { nom, description, image, id_event, id_program, id_parcour } = req.body;
  try {
    const gallery = await Gallery.create({ nom, description, image, id_event, id_program, id_parcour });
    res.status(201).send(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la galerie' });
  }
});

// Mettre à jour une galerie
router.put('/api/galleries/:id', auth, async (req, res) => {
  const { nom, description, image, id_event, id_program, id_parcour } = req.body;
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).send('Galerie non trouvée');
    }
    await gallery.update({ nom, description, image, id_event, id_program, id_parcour });
    res.status(200).send(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la galerie' });
  }
});

// Supprimer une galerie
router.delete('/api/galleries/:id', auth, async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (!gallery) {
      return res.status(404).send('Galerie non trouvée');
    }
    await gallery.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la galerie' });
  }
});

module.exports = router;
