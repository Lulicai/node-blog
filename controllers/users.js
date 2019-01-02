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
    'POST /api/editUserStatus':async(ctx,next)=>{
        let now = Date.now();
        let data = {
            id:ctx.request.body.id,
            status:ctx.request.body.status,
            updateAt:now
        }
        const res = await api.editUserStatus(data)
        // console.log(31,JSON.parse(JSON.stringify(data)))
        const userDataRank = JSON.parse(JSON.stringify(res));
        ctx.rest({
            code:'0000',
            data:userDataRank,
            message:'操作成功'
        })
    },
    'POST /api/editUser':async(ctx,next)=>{
        let now = Date.now();
        let data = {
            telephone:ctx.request.body.telephone,
            rank:ctx.request.body.rank,
            updateAt:now,
            id:ctx.request.body.id
        }
        const res = await api.editUser(data)
        const userDataRank = JSON.parse(JSON.stringify(res));
        // console.log(31,JSON.parse(JSON.stringify(userDataRank)))
        if(userDataRank == "已有手机号"){
            ctx.rest({
                code:'1002',
                message:'已有此手机号'
            })
            return;
        }
        if(userDataRank[0]){
            ctx.rest({
                code:'0000',
                message:'操作成功'
            })
        }else{
            ctx.rest({
                code:'1002',
                message:'出现错误'
            })
        }
        
    },
}