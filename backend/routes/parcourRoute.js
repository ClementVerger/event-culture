const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Parcour, Site } = require('../config/database');

// Obternir tous les parcours
router.get('/api/parcours', auth, async (req, res) => {
  try {
    const parcours = await Parcour.findAll();
    res.status(200).send(parcours);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des parcours' });
  }
});

// Obtenir tous les parcours par ID de programme
router.get('/api/parcours/program/:id', auth, async (req, res) => {
  try {
    const parcours = await Parcour.findAll({
      where: { id_program: req.params.id }
    });

    if (!parcours) {
      return res.status(404).send('Parcours non trouvé');
    }

    res.status(200).send(parcours);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des parcours' });
  }
});

// Obtenir un parcours par ID
router.get('/api/parcours/:id', auth, async (req, res) => {
  try {
    const parcours = await Parcour.findByPk(req.params.id);

    if (!parcours) {
      return res.status(404).send('Parcours non trouvé');
    }

    res.status(200).send(parcours);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du parcours' });
  }
});

// Obtenir un parcours par ID de programme

// Créer un parcours
router.post('/api/parcours', auth, async (req, res) => {
  const { nom, id_program, duree_parcour, description} = req.body;
  try {
    const parcours = await Parcour.create({ nom, id_program, duree_parcour, description });
    res.status(201).send(parcours);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Mettre à jour un parcours
router.put('/api/parcours/:id', auth, async (req, res) => {
  const {nom, id_program, duree_parcour, description  } = req.body;
  try {
    const parcours = await Parcour.findByPk(req.params.id);

    if (!parcours) {
      return res.status(404).send('Parcours non trouvé');
    }

    await parcours.update({ nom, id_program, duree_parcour, description  });
    res.status(200).send(parcours);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Supprimer un parcours
router.delete('/api/parcours/:id', auth, async (req, res) => {
  try {
    const parcours = await Parcour.findByPk(req.params.id);

    if (!parcours) {
      return res.status(404).send('Parcours non trouvé');
    }

    await parcours.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du parcours' });
  }
});

// Obtenir les sites d'un parcours
router.get('/api/parcours/:id/sites', async (req, res) => {
  try {
    const parcours = await Parcour.findByPk(req.params.id, {
      include: [
        {
          model: Site,
          as: 'sites'
        }
      ]
    });
    if (!parcours) {
      return res.status(404).send('Parcours non trouvé');
    }
    res.status(200).send(parcours.sites);
  } catch (error) {
    console.error("Erreur Sequelize :", error); // Ajout du log détaillé
    res.status(500).json({ error: 'Erreur lors de la récupération des sites du parcours', details: error.message });
  }
});

module.exports = router;