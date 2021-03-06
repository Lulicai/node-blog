const checkdata = require('../tool')
const api = require('../api');
const operateToken = require('../tool/operateToken')
const APIError = require('../middleware/rest').APIError;
const fs = require('fs');
const path = require('path')
const check = require('../tool/index.js')

module.exports = {
    'POST /api/createArticle': async (ctx, next) => {
        //得到token
        let teldata = operateToken.checkToken(ctx.request.body.token)
        if (teldata.code) {
            ctx.rest({
                code: 401,
                message: '授权已经过期，请重新登录哦亲～～'
            })
            return;
        } else {
            let data = {
                token: teldata.tel,
                classType: ctx.request.body.classType,
                title: ctx.request.body.title,
                content: ctx.request.body.content,
                contentToMark: ctx.request.body.contentToMark,
                brief: ctx.request.body.brief,
                imgUrl:ctx.request.body.imgUrl
            }
            console.log(25, data)
            const newArt = await api.createArticle(data)
            ctx.rest({
                code: '0000',
                data: newArt,
                message: '发布成功'
            })
        }
    },
    'POST /api/getArticles': async (ctx, next) => {
        let data = {
            pageNo: ctx.request.body.pageNo
        }
        const articles = await api.getArticle(data)
        // console.log(articles)
        articles.pageNo = parseInt(ctx.request.body.pageNo);
        articles.pageSize = 10;
        ctx.rest({
            code: '0000',
            data: articles,
            message: '操作成功'
        })
    },
    'POST /api/editArticleById': async (ctx, next) => {
        let teldata = operateToken.checkToken(ctx.request.body.token)
        if (teldata.code) {
            ctx.rest({
                code: 401,
                message: '授权已经过期，请重新登录哦亲～～'
            })
            return;
        } else {
            let now = Date.now();
            let data = {
                token: teldata.tel,
                id: ctx.request.body.id,
                classType: ctx.request.body.classType,
                title: ctx.request.body.title,
                content: ctx.request.body.content,
                contentToMark: ctx.request.body.contentToMark,
                brief: ctx.request.body.brief,
                updateAt: now,
                imgUrl: ctx.request.body.imgUrl
            }
            await api.editArticleById(data)
            // console.log(68,artData)
            ctx.rest({
                code: '0000',
                message: '编辑成功'
            })
        }
    },
    //前端展示获取文章信息
    'GET /api/getArticleById/:id': async (ctx, next) => {
        // console.log(76,ctx.params.id)
        let data = {
            id: ctx.params.id
        }
        const res = await api.getArticleById(data)
        ctx.rest({
            code: '0000',
            data: res,
            message: '操作成功'
        })
    },
    //删除文章
    'POST /api/deleteArticleById/': async (ctx, next) => {
        let data = {
            id: ctx.request.body.id
        }
        const res = await api.deleteArticleById(data)
        if (res) {
            ctx.rest({
                code: '0000',
                message: '操作成功'
            })
        } else {
            throw new APIError('422', '参数出错')
        }
    },
    //根据分类获取文章列表
    'POST /api/getArticleByClassType/': async (ctx, next) => {
        let data = {
            classType: ctx.request.body.classType,
            pageNo: ctx.request.body.pageNo,
        }
        const res = await api.getArticleByClassType(data)
        res.pageNo = parseInt(ctx.request.body.pageNo);
        res.pageSize = 10;
        ctx.rest({
            code: '0000',
            data: res,
            message: '操作成功'
        })
    },
    'POST /api/uploadImg/': async (ctx, next) => {
        // console.log(120, ctx.request.files.file)
        const file = ctx.request.files.file;
        const reader = fs.createReadStream(file.path);
        let myDate = new Date();
        let newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
        let filePath = path.resolve(__dirname, '..') + "/uploads/";
        let fileResource = filePath + `/${newFilename}`;
        if (!fs.existsSync(filePath)) {  //判断staic/upload文件夹是否存在，如果不存在就新建一个
            fs.mkdir(filePath, (err) => {
                if (err) {
                    throw new Error(err)
                }
            })
        }
        const uploadUrl = check.checkEnv();
        // const uploadUrl="/";
        let upstream = fs.createWriteStream(fileResource);
        reader.pipe(upstream);
        const res = {
            imgUrl:uploadUrl + `/${newFilename}`,
            name:newFilename
        }
        ctx.rest({
            code: '0000',
            data: res,
            message: '操作成功'
        })
    },
    'POST /api/deleteImg/':async(ctx, next) => {
        //传入文件的名称  
        //判断是否在某个文件夹内，有的话删
        let fileName = ctx.request.body.imgUrl;
        let filePath = path.resolve(__dirname, '..') + "/uploads/"+fileName;
        if (fs.existsSync(filePath)) {  //判断staic/upload文件夹是否存在，如果不存在就新建一个
            fs.unlinkSync(filePath);
            ctx.rest({
                code: '0000',
                message: '文件删除成功'
            })
        }else{
            ctx.rest({
                code: '1000',
                message: '文件不存在'
            })
        }
    }
}