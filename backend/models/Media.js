module.exports = (sequelize, DataTypes) => {

  const Media = sequelize.define('Media', {
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
    id_program: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PROGRAM',
        key: 'id'
      }
    },
    id_catalog: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CATALOG',
        key: 'id'
      }
    },
    type_media: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url_media: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'MEDIA',
    timestamps: true
  });
  return Media;
};
