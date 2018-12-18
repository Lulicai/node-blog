var Sequelize = require('sequelize');
const db = require('../db/db');

module.exports = db.defineModel('classify',{
    classType:{
        type:Sequelize.STRING(10),
        unique:true
    }
})