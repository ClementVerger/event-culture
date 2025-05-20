const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { User } = require('../config/database');
const bcrypt = require('bcrypt');

// Route pour récupérer la liste des utilisateurs
router.get('/api/user', auth, async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (err) {
        console.error('Error during fetching users:', err);
        res.status(500).send(err.toString());
    }
});

// Route pour récupérer un utilisateur par son id
router.get('/api/user/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (err) {
        console.error('Error during fetching user:', err);
        res.status(500).send(err.toString());
    }
});

// Route pour créer un utilisateur
router.post('/api/user', auth, async (req, res) => {
  
    const { username, email, password, role, photo, telephone, bibliographie } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword, role, photo, telephone, bibliographie });
        res.status(201).send(user);
    } catch (err) {
        console.error('Error during creating user:', err);
        res.status(500).send(err.toString());
    }
});

// Route pour mettre à jour un utilisateur
router.put('/api/user/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.username = username;
        user.email = email;
        user.role = role;
        await user.save();
        res.status(200).send(user);
    } catch (err) {
        console.error('Error during updating user:', err);
        res.status(500).send(err.toString());
    }
});

// Route pour supprimer un utilisateur
router.delete('/api/user/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        await user.destroy();
        res.status(204).send();
    } catch (err) {
        console.error('Error during deleting user:', err);
        res.status(500).send(err.toString());
    }
});
module.exports = router;
