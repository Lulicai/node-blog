const checkdata = require('../tool')
const api = require('../api');
const APIError = require('../middleware/rest').APIError;

module.exports = {
    'POST /api/createClass':async(ctx,next)=>{
        let data = {
            classType:ctx.request.body.classType
        }
        const createdClass = await api.createClass(data)
        if(createdClass == '该分类已存在'){
            ctx.rest({
                code:'1002',
                message:'该分类已存在'
            });
        }else{
            ctx.rest({
                code:'0000',
                data:[createdClass],
                message:'操作成功'
            });
        }
    },
    'POST /api/editClass':async(ctx,next)=>{
        let now = Date.now();
        let data = {
            id:ctx.request.body.id,
            classType:ctx.request.body.classType,
            updateAt:now
        }
        const res = await api.editClass(data);
        ctx.rest({
            code:'0000',
            message:'编辑成功'
        });
    },
    'GET /api/classify':async(ctx,next)=>{
        const allClass = await api.findAllClass();
        ctx.rest({
            code:'0000',
            data:allClass,
            message:'操作成功'
        });
    },
    'POST /api/deleteClass':async(ctx,next)=>{
        const deleRes = await api.deleteClass({id:ctx.request.body.id});
        if(deleRes){
            ctx.rest({
                code:'0000',
                message:'操作成功'
            });
        }else{
            throw new APIError('422','参数出错')
        }
    }
}