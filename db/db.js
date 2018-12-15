var Sequelize = require('sequelize');
const uuid = require('uuid');
const config = require('../config')

function generateId (){
    return uuid.v4();
}

var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host:config.host,
        dialect:'mysql',
        port:config.port,
        pool:{
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false // true by default
        }
    })

var ID_TYPE = Sequelize.STRING(50);
function defineModel(name,attributes) {
    var attrs = {};
    for(let key in attributes){
        let value = attributes[key];
        // console.log(32,typeof value.type)
        if(typeof value == "object"){
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }else{
            attrs[key] = {
                type: value,
                allowNull: false
            }
        } 
    }

    attrs.id = {
        type: ID_TYPE,
        primaryKey:true
    }
    attrs.createAt = {
        type: Sequelize.BIGINT
    }
    attrs.updateAt = {
        type: Sequelize.BIGINT
    }

    return sequelize.define(name,attrs,{
        tableName:name,
        timestamps: false,
        hooks:{
            beforeValidate: function(instance, options) {
               let now = Date.now();
               if(!instance.id){
                instance.id = generateId()
               }
               instance.createAt = now;
               instance.updateAt = now;
            }
        },
    })
}

var exp = {
    defineModel:defineModel,
    ID:ID_TYPE,
    generateId:generateId,
    sync: () => {
        sequelize.sync({ force: true });
    }
}
module.exports = exp;