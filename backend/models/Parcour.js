// Parcour.js
module.exports = (sequelize, DataTypes) => {
  const Parcour = sequelize.define('Parcour', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_program: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PROGRAM',
        key: 'id'
      }
    },
    duree_parcour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    tableName: 'PARCOUR',
    timestamps: false
  });

  Parcour.associate = (models) => {
    Parcour.belongsTo(models.Program, { foreignKey: 'id_program', as: 'program' });

    Parcour.belongsToMany(models.Site, {
      through: models.ParcourSite,
      foreignKey: 'id_parcour',
      otherKey: 'id_site',
      as: 'sites'
    });
  };

  return Parcour;
}
