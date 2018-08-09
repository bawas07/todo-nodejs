'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Todos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                references:{
                    model: 'Users',
                    key: 'id'
                }
            },
            name: {
                type: Sequelize.STRING
            },
            priority: {
                type: Sequelize.INTEGER
            },
            location: {
                type: Sequelize.STRING
            },
            time_start: {
                type: Sequelize.DATE
            },
            is_done: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
  },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Todos')
  }
}