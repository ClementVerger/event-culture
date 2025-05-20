module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_event: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EVENT',
        key: 'id'
      }
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    duree_jours: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'PROGRAM',
    timestamps: true
  });

  // Associations
  Program.associate = (models) => {
    Program.belongsTo(models.Event, { foreignKey: 'id_event', as: 'event' });
  };
    // Retourne le modèle correctement
  return Program;
};
