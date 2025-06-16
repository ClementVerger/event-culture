const express = require('express');
const { sequelize } = require('./config/database');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');
const lieuRoutes = require('./routes/lieuRoute'); 
const programRoutes = require('./routes/programRoute'); 
const siteRoutes = require('./routes/siteRoute');
const parcourRoutes = require('./routes/parcourRoute');
const parcourSiteRoutes = require('./routes/parcour-sitesRoute');
const galleryRoutes = require('./routes/galleryRoute');

const participantRoutes = require('./routes/participantRoute'); 


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Synchronisation des modèles avec la base de données
sequelize.sync({ /*force: false*/  }).then(() => {
    console.log('Database & tables created!');
});

// Define Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(eventRoutes);
app.use(lieuRoutes);
app.use(programRoutes);
app.use(siteRoutes);
app.use(parcourRoutes);
app.use(parcourSiteRoutes);
app.use(galleryRoutes); 

app.use(participantRoutes); 


// Route de test pour vérifier la connexion à la base de données
app.get('/', (req, res) => {
    try {
        res.send('Welcome to the event management API');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.toString());
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));