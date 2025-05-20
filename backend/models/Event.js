module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_lieu: {
      type: DataTypes.INTEGER,
    },
    id_createur: {
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'EVENT',
    timestamps: true
  });

  Event.associate = (models) => {
    Event.belongsTo(models.Lieu, { foreignKey: 'id_lieu', as: 'lieu' });
    Event.belongsTo(models.User, { foreignKey: 'id_createur', as: 'createur' });
  };
  
  return Event;
};