module.exports = (sequelize, DataTypes) => {

  const Comment = sequelize.define('Comment', {
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
    commentaire: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    tableName: 'COMMENT',
    timestamps: true
  });

  return Comment;
};