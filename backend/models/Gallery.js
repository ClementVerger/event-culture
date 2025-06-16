module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_event: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'EVENT',
        key: 'id'
      }
    },
    id_program: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PROGRAM',
        key: 'id'
      }
    },
    id_parcour: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PARCOUR',
        key: 'id'
      }
    }
  }, {
    tableName: 'GALLERY',
    timestamps: true
  });

  Gallery.associate = (models) => {
    Gallery.belongsTo(models.Event, { foreignKey: 'id_event', as: 'event' });
    Gallery.belongsTo(models.Program, { foreignKey: 'id_program', as: 'program' });
    Gallery.belongsTo(models.Parcour, { foreignKey: 'id_parcour', as: 'parcour' });
  };

  return Gallery;
};
