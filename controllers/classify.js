const api = require('../api');
const APIError = require('../middleware/rest').APIError;

module.exports = {
    'POST /api/createClass':async(ctx,next)=>{
        let data = {
            classType:ctx.request.body.classType
        }
        const createdClass = await api.createClass(data)
        const res = JSON.parse(JSON.stringify(createdClass))
        if(res[1]){
            ctx.rest({
                code:'0000',
                data:[res[0]],
                message:'操作成功'
            });
        }else{
            ctx.rest({
                code:'1002',
                message:'该分类已存在'
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
    'POST /api/getAllClass':async(ctx,next)=>{
        // const allClass = await api.findAllClass();
        // ctx.rest({
        //     code:'0000',
        //     data:allClass,
        //     message:'操作成功'
        // });
        let data = {
            pageNo:parseInt(ctx.request.body.pageNo)
        }
        const res = await api.findAllClass(data)
        // console.log(31,JSON.parse(JSON.stringify(data)))
        const classData = JSON.parse(JSON.stringify(res));
        classData.pageNo = parseInt(ctx.request.body.pageNo);
        classData.pageSize = 10;
        ctx.rest({
            code:'0000',
            data:classData,
            message:'操作成功'
        })
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