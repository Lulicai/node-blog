//TODO
//从数据库拿数据给接口返回
//登录注册的接口
const api = require('../api');
module.exports = {
    'GET /api/login':async(ctx,next)=>{
        ctx.set("Content-Type","application/json");
        //前端提交过来的数据
        let user = {
            telephone:232323,
            password:'ffffff'
        }
        const data = await api.createUser(user)
        ctx.body = data;
    },
    'POST /api/register':async(ctx,next)=>{
        ctx.set("Content-Type","application/json");
        ctx.body = 'register'
    },
}