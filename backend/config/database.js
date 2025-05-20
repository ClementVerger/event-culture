const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('eventculture', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('../models/user')(sequelize, DataTypes);
db.Lieu = require('../models/lieu')(sequelize, DataTypes);
db.Event = require('../models/event')(sequelize, DataTypes);
db.Program = require('../models/Program')(sequelize, DataTypes);
db.Site = require('../models/Site')(sequelize, DataTypes);
db.Parcour = require('../models/Parcour')(sequelize, DataTypes);
db.ParcourSite = require('../models/ParcourSite')(sequelize, DataTypes);
db.Catalog = require('../models/Catalog')(sequelize, DataTypes);
db.Oeuvre = require('../models/Oeuvre')(sequelize, DataTypes);
db.Media = require('../models/Media')(sequelize, DataTypes);
db.Participant = require('../models/Participant')(sequelize, DataTypes);
db.Comment = require('../models/Comment')(sequelize, DataTypes);


// Définir les associations après le chargement des modèles
db.Lieu.hasMany(db.Event, { foreignKey: 'id_lieu' });
db.Event.belongsTo(db.Lieu, { foreignKey: 'id_lieu', as: 'lieu' });
db.Event.belongsTo(db.User, { foreignKey: 'id_createur', as: 'createur' });
db.Program.belongsTo(db.Event, { foreignKey: 'id_event', as: 'event' });


module.exports = db;