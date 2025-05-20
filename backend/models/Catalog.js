module.exports = (sequelize, DataTypes) => {

  const Catalog = sequelize.define('Catalog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_event: {
      type: DataTypes.INTEGER,
      references: {
        model: 'EVENT',
        key: 'id'
      }
    },
    nom_catalogue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'CATALOG',
    timestamps: true
  });

  return Catalog;

}

