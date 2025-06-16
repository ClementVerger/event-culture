module.exports = (sequelize, DataTypes) => {
    const Site = sequelize.define('Site', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      histoire: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      id_lieu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'LIEU',
          key: 'id'
        }
      },
    }, {
      tableName: 'SITE',
      timestamps: true
    });
  
    // Associations
    Site.associate = (models) => {
      Site.belongsTo(models.Lieu, { foreignKey: 'id_lieu', as: 'lieu' });
    
      Site.belongsToMany(models.Parcour, {
        through: models.ParcourSite,
        foreignKey: 'id_site',
        otherKey: 'id_parcour',
        as: 'parcours'
      });
    };
    

    return Site;
  };
  