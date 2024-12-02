'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Review', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        },
        foreignKey: true,
        allowNull: false,
    },
    restroomId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            notEmpty: true,
        },
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 64],
        },
    },
    content: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 1200],
        },
    },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Review');
  }
};


