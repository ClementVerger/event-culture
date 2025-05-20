const express = require('express');
const router = express.Router();
const { Catalog } = require('../config/database');
const auth = require('../middleware/auth');

// Obtenir tous les catalogues
router.get('/api/catalogs', auth, async (req, res) => {
  try {
    const catalogs = await Catalog.findAll();
    res.status(200).send(catalogs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des catalogues' });
  }
});

// Obtenir un catalogue par ID
router.get('/api/catalogs/:id', auth, async (req, res) => {
  try {
    const catalog = await Catalog.findByPk(req.params.id);
    if (!catalog) {
      return res.status(404).send('Catalogue non trouvé');
    }
    res.status(200).send(catalog);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du catalogue' });
  }
});

// Créer un catalogue
router.post('/api/catalogs', auth, async (req, res) => {
  const { id_event, nom_catalogue, description } = req.body;
  try {
    const catalog = await Catalog.create({ id_event, nom_catalogue, description});
    res.status(201).send(catalog);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du catalogue' });
  }
});

// Mettre à jour un catalogue
router.put('/api/catalogs/:id', auth, async (req, res) => {
  const { id_event, nom_catalogue, description } = req.body;
  try {
    const catalog = await Catalog.findByPk(req.params.id);
    if (!catalog) {
      return res.status(404).send('Catalogue non trouvé');
    }
    catalog.id_event = id_event;
    catalog.nom_catalogue = nom_catalogue;
    catalog.description = description;
    await catalog.save();
    res.status(200).send(catalog);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du catalogue' });
  }
});

// Supprimer un catalogue
router.delete('/api/catalogs/:id', auth, async (req, res) => {
  try {
    const catalog = await Catalog.findByPk(req.params.id);
    if (!catalog) {
      return res.status(404).send('Catalogue non trouvé');
    }
    await catalog.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du catalogue' });
  }
});

module.exports = router;