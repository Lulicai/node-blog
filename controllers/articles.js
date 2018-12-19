const checkdata = require('../tool')
const api = require('../api');
const operateToken = require('../tool/operateToken')
const APIError = require('../middleware/rest').APIError;

module.exports = {
    'POST /api/createArticle':async(ctx,next)=>{
        //得到token
        let teldata = operateToken.checkToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNzYwMDIwOTc4MSIsImV4cCI6MTU0NTcyNjU1OSwiaWF0IjoxNTQ1MTIxNzU5fQ.iwopxqbcSfnOaJvg1CvLv--rQNNPt4RPl1zo2Z0hnTE')
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
        let teldata = operateToken.checkToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxNzYwMDIwOTc4MSIsImV4cCI6MTU0NTcyNjU1OSwiaWF0IjoxNTQ1MTIxNzU5fQ.iwopxqbcSfnOaJvg1CvLv--rQNNPt4RPl1zo2Z0hnTE')
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
            const artData = await api.editArticleById(data)
            // console.log(68,artData)
            ctx.rest({
                code:'0000',
                message:'编辑成功'
            })
        }
    },
    'GET /api/getArticleById/:id':async({ctx,next})=>{
        
    }
}