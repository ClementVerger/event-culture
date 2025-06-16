module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Supprimer l'ancienne contrainte
    await queryInterface.removeConstraint('PARCOUR', 'parcour_ibfk_1'); // ou le bon nom si différent

    // Ajouter la nouvelle contrainte avec ON DELETE CASCADE
    await queryInterface.addConstraint('PARCOUR', {
      fields: ['id_program'],
      type: 'foreign key',
      name: 'fk_parcour_id_program',
      references: {
        table: 'PROGRAM',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer la contrainte cascade
    await queryInterface.removeConstraint('PARCOUR', 'fk_parcour_id_program');

    // Recréer la contrainte sans ON DELETE CASCADE
    await queryInterface.addConstraint('PARCOUR', {
      fields: ['id_program'],
      type: 'foreign key',
      name: 'parcour_ibfk_1',
      references: {
        table: 'PROGRAM',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  }
};
