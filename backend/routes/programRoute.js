const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Program, Event, Lieu } = require('../config/database');

// Obtenir tous les programmes
router.get('/api/programs', async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.status(200).send(programs);
  } catch (error) {
    console.error("Erreur Sequelize :", error); // ← Ajoute ceci

    res.status(500).json({ error: 'Erreur lors de la récupération des programmes' });
  }
});


// Obtenir un programme par ID
router.get('/api/programs/:id', auth, async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id, {
        include: [
          {
            model: Event,
            as: 'event',
            attributes: ['titre'],
            include: [
              {
                model: Lieu,
                as: 'lieu',
                attributes: ['nom']
              }
            ]
          }
         
        ]
      }

    );

    if (!program) {
      return res.status(404).send('Programme non trouvé');
    }
    res.status(200).send(program);
  } catch (error) {
    console.error("Erreur Sequelize :", error); // ← Ajoute ceci
    res.status(500).json({ error: 'Erreur lors de la récupération du programme' });
  }
});



// Créer un programme
router.post('/api/programs', auth, async (req, res) => {
  const { id_event, titre, description, duree_jours, image_url } = req.body;
  try {
    const program = await Program.create({ id_event, titre, description, duree_jours, image_url });
    res.status(201).send(program);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Mettre à jour un programme
router.put('/api/programs/:id', auth, async (req, res) => {
  const { id_event, titre, description, duree_jours, image_url } = req.body;
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).send('Programme non trouvé');
    }
    program.id_event = id_event;
    program.titre = titre;
    program.description = description;
    program.duree_jours = duree_jours;
    program.image_url = image_url;
    await program.save();
    res.status(200).send(program);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du programme' });
  }
});

// Supprimer un programme
router.delete('/api/programs/:id', auth, async (req, res) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return res.status(404).send('Programme non trouvé');
    }
    await program.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du programme' + error });
  }
});

module.exports = router;