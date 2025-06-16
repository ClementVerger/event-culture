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
db.Participant = require('../models/Participant')(sequelize, DataTypes);
db.Gallery = require('../models/Gallery')(sequelize, DataTypes);



// Appeler les méthodes associate si elles existent
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;