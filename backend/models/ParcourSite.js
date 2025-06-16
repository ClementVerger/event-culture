module.exports = (sequelize, DataTypes) => {
    const ParcourSite = sequelize.define('ParcourSite', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_parcour: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'PARCOUR',
                key: 'id'
            }
        },
        id_site: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'SITE',
                key: 'id'
            }
        },
        ordre: {
            type: DataTypes.INTEGER,
            allowNull: true // Pour dire l'ordre de visite des sites
        }
    }, {
        tableName: 'PARCOUR_SITE',
        timestamps: false
    });

    // Ajout de l'association pour Sequelize (important pour les belongsToMany)
    ParcourSite.associate = (models) => {
        ParcourSite.belongsTo(models.Parcour, { foreignKey: 'id_parcour', as: 'parcour' });
        ParcourSite.belongsTo(models.Site, { foreignKey: 'id_site', as: 'site' });
    };

    return ParcourSite;
}