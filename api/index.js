const model = require('../middleware/model');
const APIError = require('../middleware/rest').APIError;
// var Sequelize = require('sequelize');
// const Op = Sequelize.Op
let User = model.user;
let Classify = model.classify;


module.exports = {
    //注册创建用户
    createUser: async ({telephone,password})=>{
        try{
            const findUser = await User.findAll({
                where:{
                    telephone:telephone
                }
            })
            // console.log(13,findUser)
            if(findUser.length == 0){
                const user = await User.create({
                    telephone: telephone,
                    password: password,
                    remark:''
                })
                return user;
            }else{
                return '该用户已存在';
            }
        }catch(err){
            //捕捉报错
            // console.log(25,err)
            throw new APIError('1003','系统出错啦，稍后再试啊～～')
        }    
    },
    //登录确认用户
    affirmUser: async({telephone,password})=>{
        try{
            const findUser = await User.findAll({
                where:{
                    telephone:telephone
                }
            })
            return findUser
        }catch(err){
            //捕捉报错
            throw new APIError('1003','系统出错啦，稍后再试啊～～')
        }
    },
    //创建文章分类
    createClass:async({classType})=>{
        try{
            const findClass = await Classify.findAll({
                where:{
                    classType:classType
                }
            })
            if(findClass.length == 0){
                const data = await Classify.create({
                    classType: classType,
                })
                return data;
            }else{
                return '该分类已存在';
            }
        }catch(err){
            //捕捉报错
            throw new APIError('1003','系统出错啦，稍后再试啊～～')
        }
    },
    //编辑文章分类
    editClass:async({id,classType,updateAt})=>{
        try{
            const updateClass = await Classify.update(
                {classType:classType,updateAt:updateAt},
                {
                    where:{
                        id:id
                    }
                })
        }catch(err){
            throw new APIError('1003','系统出错啦，稍后再试啊～～')
        }
    },
    //查询所有的分类
    findAllClass:async()=>{
        try{
            const findallClass = await Classify.findAll();
            return findallClass;
        }catch(err){
            console.log(81,err)
            throw new APIError('1003','系统出错啦，稍后再试啊～～')
        }
    },
    //删除分类
    deleteClass:async({id})=>{
        try{
            await Classify.destroy({
                where:{
                    id:id
                }
            });
        }catch(err){
            console.log(104,err)
            throw new APIError('1003','系统出错啦，稍后再试啊～～')
        }
    }
}