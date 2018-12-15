var Sequelize = require('sequelize');
const db = require('../db/db');

module.exports = db.defineModel('user',{
    telephone:{
        type:Sequelize.STRING(11),
        unique:true
    },
    password:Sequelize.STRING(100),
    remark:Sequelize.TEXT
})