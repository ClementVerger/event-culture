module.exports = (sequelize, DataTypes) => {
  const Oeuvre = sequelize.define('Oeuvre', {
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
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prix: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'OEUVRE',
    timestamps: true
  });

  return Oeuvre;

};
