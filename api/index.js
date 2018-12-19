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
        const data = await User.findOrCreate({where:{telephone:telephone},defaults:{password:password,remark:''}})
        return data;
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
        const data = await Classify.findOrCreate({where:{classType:classType}})
        return data;
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
        const findallClass = await Classify.findAll({'order': [['createAt','DESC']]});
        return findallClass;
    },
    //删除分类
    deleteClass:async({id})=>{
        const deleRes = await Classify.destroy({
            where:{
                id:id
            }
        });
        // console.log(78,deleRes)
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
        // console.log(78,pageNo)
        var countPerPage = 10, currentPage = pageNo;
        let eee = await Articles.findAndCountAll({
            'limit': countPerPage,                      // 每页多少条
            'offset': countPerPage * (currentPage - 1),  // 跳过多少条
            'order': [['createAt','DESC']]
        });
        // console.log(108,JSON.stringify(eee))
        return eee
    },
    //编辑文章
    editArticleById:async({token,id,updateAt,title,content,contentToMark,brief,classType})=>{
        //根据token查询userId，查出来之后提交给文章表
        const findUserId = await User.findAll({
            where:{
                telephone:token
            }
        })
        const updateArt = await Articles.update(
            {
                classType:classType,
                title:title,
                content:content,
                contentToMark:contentToMark,
                brief:brief,
                updateAt:updateAt
            },
            {
                where:{
                    id:id,
                    userId:findUserId[0].id
                }
            })
            // console.log(102,updateArt)
            return updateArt
        // console.log(102,updateArt)
    },
    getArticleById:async({id})=>{
        
    }
}