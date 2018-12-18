var Sequelize = require('sequelize');
const db = require('../db/db');

module.exports = db.defineModel('articles',{
    title:Sequelize.STRING(30),
    classType:Sequelize.STRING(10),
    userId:Sequelize.STRING(50),
    content:Sequelize.TEXT,
    contentToMark:Sequelize.TEXT,
    brief:Sequelize.STRING(100)
})