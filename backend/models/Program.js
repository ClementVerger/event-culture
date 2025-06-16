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
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 'PROGRAM',
    timestamps: true
  });

  // Associations
  Program.associate = (models) => {
    Program.belongsTo(models.Event, { foreignKey: 'id_event', as: 'event', onDelete: 'CASCADE', hooks: true });

    Program.hasMany(models.Parcour, {
      foreignKey: 'id_program',
      as: 'parcours',
      onDelete: 'CASCADE',
    });
    Program.hasMany(models.Gallery, { foreignKey: 'id_program', as: 'galleries', onDelete: 'CASCADE' });
  };


  // Retourne le modèle correctement
  return Program;
};
