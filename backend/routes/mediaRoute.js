const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Media } = require('../config/database');

// Obtenir tous les médias
router.get('/api/medias', auth, async (req, res) => {
  try {
    const medias = await Media.findAll();
    res.status(200).send(medias);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des médias' });
  }
});

// Obtenir un média par ID
router.get('/api/medias/:id', auth, async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).send('Média non trouvé');
    }
    res.status(200).send(media);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du média' });
  }
});

// Créer un média
router.post('/api/medias', auth, async (req, res) => {
  const { id_event, id_program, id_catalog, type_media, url_media } = req.body;
  try {
    const media = await Media.create({ id_event, id_program, id_catalog, type_media, url_media });
    res.status(201).send(media);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du média' });
  }
});

// Mettre à jour un média
router.put('/api/medias/:id', auth, async (req, res) => {
  const { id_catalog, titre, description, url } = req.body;
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).send('Média non trouvé');
    }
    media.id_catalog = id_catalog;
    media.titre = titre;
    media.description = description;
    media.url = url;
    await media.save();
    res.status(200).send(media);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du média' });
  }
});

// Supprimer un média
router.delete('/api/medias/:id', auth, async (req, res) => {
  try {
    const media = await Media.findByPk(req.params.id);
    if (!media) {
      return res.status(404).send('Média non trouvé');
    }
    await media.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du média' });
  }
});


module.exports = router;