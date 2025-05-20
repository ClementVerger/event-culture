const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../middleware/private-key');
const { User } = require('../config/database');
const { Op } = require('sequelize');
const auth = require('../middleware/auth');

// Route pour l'inscription des utilisateurs
router.post('/api/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log('req.body:', req.body);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role });
        res.status(201).send(user);
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send(err.toString());
    }
});

// Route pour la connexion des utilisateurs avec l'email ou le nom d'utilisateur
router.post('/api/login', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email && !username) {
            return res.status(400).json({ message: 'Email or username is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    email ? { email } : null,
                    username ? { username } : null
                ].filter(Boolean) // Remove null values
            }
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        // Pwd pas bon :
        if (!isPasswordValid) {
            const message = `Password incorrect.`;
            return res.status(401).json({ message });
        }

        // Générer un jeton JWT valide pendant 24 heures.
        const token = jwt.sign(
            { userId: user.id },
            privateKey,
            { expiresIn: '24h' }
        );

        const message = `User connecté avec succès`;
        return res.json({ message, data: user, token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send(err.toString());
    }
});

// Route pour récupérer l'utilisateur actuel
router.get('/api/current_user', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (err) {
        console.error('Error during fetching current user:', err);
        res.status(500).send(err.toString());
    }
});
  
module.exports = router;
