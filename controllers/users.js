//用户管理的接口操作部分
const api = require('../api');
const operateToken = require('../tool/operateToken');
var sha1 = require('sha1');
module.exports = {
    'POST /api/getAllUser':async(ctx,next)=>{
        let data = {
            pageNo:ctx.request.body.pageNo
        }
        const res = await api.getAllUser(data)
        // console.log(31,JSON.parse(JSON.stringify(data)))
        const userData = JSON.parse(JSON.stringify(res));
        userData.pageNo = parseInt(ctx.request.body.pageNo);
        userData.pageSize = 10;
        ctx.rest({
            code:'0000',
            data:userData,
            message:'操作成功'
        })
    },
    'POST /api/editUserRank':async(ctx,next)=>{
        let now = Date.now();
        let data = {
            id:ctx.request.body.id,
            status:ctx.request.body.status,
            updateAt:now
        }
        const res = await api.editUserRank(data)
        // console.log(31,JSON.parse(JSON.stringify(data)))
        const userDataRank = JSON.parse(JSON.stringify(res));
        ctx.rest({
            code:'0000',
            data:userDataRank,
            message:'操作成功'
        })
    },
}