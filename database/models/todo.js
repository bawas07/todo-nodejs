'use strict'
module.exports = (sequelize, DataTypes) => {
    var Todo = sequelize.define('Todo', {
        user_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        priority: DataTypes.INTEGER,
        location: DataTypes.STRING,
        time_start: DataTypes.DATE,
        is_done: DataTypes.BOOLEAN
    }, {})
    Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
  })
    }
    return Todo
}