const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const password = sequelize.define('password',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
})