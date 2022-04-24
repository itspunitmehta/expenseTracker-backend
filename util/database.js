const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'Punit@1415',{
    dialect: 'mysql',
    host:'localhost'
});


module.exports = sequelize;