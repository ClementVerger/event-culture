const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Site, Lieu } = require('../config/database');

// Obtenir tous les sites
router.get('/api/sites', auth, async (req, res) => {
  try {
    const sites = await Site.findAll();
    res.status(200).send(sites);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des sites' });
  }
});

// Obtenir un site par ID
router.get('/api/sites/:id', auth, async (req, res) => {
  try {
    const site = await Site.findByPk(req.params.id);

    if (!site) {
      return res.status(404).send('Site non trouvé');
    }

    res.status(200).send(site);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du site' });
  }
});

// Créer un site
router.post('/api/sites', auth, async (req, res) => {
    console.log("req.body", req.body);
  const { titre, image_url, histoire, type, latitude, longitude, id_lieu, id_program } = req.body;
  try {
    const site = await Site.create({ titre, image_url, histoire, type, latitude, longitude, id_lieu, id_program });
    res.status(201).send(site);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Mettre à jour un site
router.put('/api/sites/:id', auth, async (req, res) => {
  const { titre, image_url, histoire, type, latitude, longitude, id_lieu, id_program } = req.body;
  try {
    const site = await Site.findByPk(req.params.id);

    if (!site) {
      return res.status(404).send('Site non trouvé');
    }

    await site.update({ titre, image_url, histoire, type, latitude, longitude, id_lieu, id_program });
    res.status(200).send(site);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Supprimer un site
router.delete('/api/sites/:id', auth, async (req, res) => {
  try {
    const site = await Site.findByPk(req.params.id);

    if (!site) {
      return res.status(404).send('Site non trouvé');
    }

    await site.destroy();
    res.status(200).send('Site supprimé avec succès');
  } catch (error) {
    res.status(500).send(error.toString());
  }
});
module.exports = router;