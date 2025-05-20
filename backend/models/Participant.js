module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'USER',
        key: 'id'
      }
    },
    id_event: {
      type: DataTypes.INTEGER,
      references: {
        model: 'EVENT',
        key: 'id'
      }
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'PARTICIPANT',
    timestamps: true
  });
  return Participant;

};

