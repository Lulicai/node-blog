const checkdata = require('../tool')
const api = require('../api');
const operateToken = require('../tool/operateToken')
const APIError = require('../middleware/rest').APIError;

module.exports = {
    'POST /api/createArticle':async(ctx,next)=>{
        //得到token
        let teldata = operateToken.checkToken(ctx.request.body.token)
        if(teldata.code){
            ctx.rest({
                code:401,
                message:'授权已经过期，请重新登录哦亲～～'
            })
            return;
        }else{
            let data = {
                token:teldata.tel,
                classType:ctx.request.body.classType,
                title:ctx.request.body.title,
                content:ctx.request.body.content,
                contentToMark:ctx.request.body.contentToMark,
                brief:ctx.request.body.brief
            }
            console.log(25,data)
           const newArt = await api.createArticle(data)
           ctx.rest({
                code:'0000',
                data:newArt,
                message:'发布成功'
            })
        } 
    },
    'POST /api/getArticles':async(ctx,next)=>{
        let data = {
            pageNo:ctx.request.body.pageNo
        }
        const articles = await api.getArticle(data)
        // console.log(articles)
        articles.pageNo = parseInt(ctx.request.body.pageNo);
        articles.pageSize = 10;
        ctx.rest({
            code:'0000',
            data:articles,
            message:'操作成功'
        })
    },
    'POST /api/editArticleById':async(ctx,next)=>{
        let teldata = operateToken.checkToken(ctx.request.body.token)
        if(teldata.code){
            ctx.rest({
                code:401,
                message:'授权已经过期，请重新登录哦亲～～'
            })
            return;
        }else{
            let now = Date.now();
            let data = {
                token:teldata.tel,
                id:ctx.request.body.id,
                classType:ctx.request.body.classType,
                title:ctx.request.body.title,
                content:ctx.request.body.content,
                contentToMark:ctx.request.body.contentToMark,
                brief:ctx.request.body.brief,
                updateAt:now
            }
            await api.editArticleById(data)
            // console.log(68,artData)
            ctx.rest({
                code:'0000',
                message:'编辑成功'
            })
        }
    },
    //前端展示获取文章信息
    'GET /api/getArticleById/:id':async(ctx,next)=>{
        // console.log(76,ctx.params.id)
        let data = {
            id:ctx.params.id
        }
        const res = await api.getArticleById(data)
        ctx.rest({
            code:'0000',
            data:res,
            message:'操作成功'
        })
    },
    //删除文章
    'POST /api/deleteArticleById/':async(ctx,next)=>{
        let data = {
            id:ctx.request.body.id
        }
        const res = await api.deleteArticleById(data)
        if(res){
            ctx.rest({
                code:'0000',
                message:'操作成功'
            })
        }else{
            throw new APIError('422','参数出错')
        }
    },
    //根据分类获取文章列表
    'POST /api/getArticleByClassType/':async(ctx,next)=>{
        let data = {
            classType:ctx.request.body.classType,
            pageNo:ctx.request.body.pageNo,
        }
        const res = await api.getArticleByClassType(data)
        res.pageNo = parseInt(ctx.request.body.pageNo);
        res.pageSize = 10;
        ctx.rest({
            code:'0000',
            data:res,
            message:'操作成功'
        })
    }
}