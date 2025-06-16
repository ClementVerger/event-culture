const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { ParcourSite } = require('../config/database');

// Ajouter un site à un parcours
router.post('/api/parcour-sites', auth, async (req, res) => {
  const { id_parcour, id_site, ordre } = req.body;
  try {
    if (!id_parcour || !id_site) {
      return res.status(400).json({ error: 'id_parcour et id_site sont requis' });
    }
    const parcourSite = await ParcourSite.create({ id_parcour, id_site, ordre });
    res.status(201).send(parcourSite);
  } catch (error) {
    console.error("Erreur lors de la création du lien parcours-site :", error); // Ajout du log détaillé
    res.status(500).json({ error: 'Erreur lors de la création du lien parcours-site', details: error.message });
  }
});

// Récupérer tous les sites d'un parcours donné
router.get('/api/parcour-sites/:id_parcour', auth, async (req, res) => {
  try {
    const parcourSites = await ParcourSite.findAll({
      where: { id_parcour: req.params.id_parcour },
      order: [['ordre', 'ASC']]
    });
    res.status(200).send(parcourSites);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des sites du parcours' });
  }
});

// Modifier l'ordre ou changer un site
router.put('/api/parcour-sites/:id', auth, async (req, res) => {
  const { id_site, ordre } = req.body;
  try {
    const parcourSite = await ParcourSite.findByPk(req.params.id);

    if (!parcourSite) {
      return res.status(404).send('Association parcours-site non trouvée');
    }

    await parcourSite.update({ id_site, ordre });
    res.status(200).send(parcourSite);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Supprimer un lien site-parcours
router.delete('/api/parcour-sites/:id', auth, async (req, res) => {
  try {
    const parcourSite = await ParcourSite.findByPk(req.params.id);

    if (!parcourSite) {
      return res.status(404).send('Association parcours-site non trouvée');
    }

    await parcourSite.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du lien parcours-site' });
  }
});

module.exports = router;
