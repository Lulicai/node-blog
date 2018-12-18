const model = require('../middleware/model');
const APIError = require('../middleware/rest').APIError;
// var Sequelize = require('sequelize');
// const Op = Sequelize.Op
let User = model.user;
let Classify = model.classify;
let Articles = model.articles;


module.exports = {
    //注册创建用户
    createUser: async ({telephone,password})=>{
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
    },
    //登录确认用户
    affirmUser: async({telephone,password})=>{
        const findUser = await User.findAll({
            where:{
                telephone:telephone
            }
        })
        return findUser
    },
    //创建文章分类
    createClass:async({classType})=>{
        const findClass = await Classify.findAll({
            where:{
                classType:classType
            }
        })
        if(findClass.length !== 0){ 
            return '该分类已存在';
        }else{
            const data = await Classify.create({
                classType: classType,
            })
            return data;
        }
    },
    //编辑文章分类
    editClass:async({id,classType,updateAt})=>{
        const updateClass = await Classify.update(
            {classType:classType,updateAt:updateAt},
            {
                where:{
                    id:id
                }
            })
            return updateClass
    },
    //查询所有的分类
    findAllClass:async()=>{
        const findallClass = await Classify.findAll();
        return findallClass;
    },
    //删除分类
    deleteClass:async({id})=>{
        const deleRes = await Classify.destroy({
            where:{
                id:id
            }
        });
        console.log(78,deleRes)
        return deleRes;
    },
    //创建用户的文章
    createArticle:async({token,classType,title,content,contentToMark,brief})=>{
            //根据token查询userId，查出来之后提交给文章表
            const findUserId = await User.findAll({
                where:{
                    telephone:token
                }
            })
            // console.log(120,findUserId[0].id)
            const allart = await Articles.create({
                classType:classType,
                title:title,
                content:content,
                contentToMark:contentToMark,
                brief:brief,
                userId:findUserId[0].id
            })
            // console.log(126,allart)
            return allart
    },
    //分页查询文章
    getArticle:async({pageNo})=>{
        var countPerPage = 10, currentPage = pageNo;
        var eee = await Articles.findAndCountAll({
            'limit': countPerPage,                      // 每页多少条
            'offset': countPerPage * (currentPage - 1)  // 跳过多少条
        });
        // 
        // console.log(108,JSON.stringify(eee))
        return eee
    }
}