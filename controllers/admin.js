//用户管理的接口操作部分
const checkdata = require('../tool')
const api = require('../api');
const operateToken = require('../tool/operateToken')
module.exports = {
    'POST /api/register':async(ctx,next)=>{
        if(checkdata.checkNone(ctx.request.body.telephone)){
            ctx.rest({
                code:'10002',
                message:'手机号不能为空哟～～～'
            })
            return;
        }else if(checkdata.checkTel(ctx.request.body.telephone)){
            ctx.rest({
                code:'10002',
                message:'请填写正确的手机号～～～'
            })
            return;
        }else if(checkdata.checkNone(ctx.request.body.password)){
            ctx.rest({
                code:'10002',
                message:'密码不能为空哟～～～'
            })
            return;
        }else{
            let user = {
                telephone:ctx.request.body.telephone,
                password:ctx.request.body.password
            }
            const data = await api.createUser(user)
            if(data == '该用户已存在'){
                ctx.rest({
                    code:'1002',
                    message:'亲亲，您已经注册了哟～～'
                });
            }else{
                ctx.rest({
                    code:'0000',
                    data:operateToken.createToken(ctx.request.body.telephone),
                    message:'操作成功'
                });
            }
        }
    },
    'POST /api/login':async(ctx,next)=>{
        //前端提交过来的数据
        if(checkdata.checkNone(ctx.request.body.telephone)){
            ctx.rest({
                code:'10002',
                message:'手机号不能为空哟～～～'
            })
            return;
        }else if(checkdata.checkTel(ctx.request.body.telephone)){
            ctx.rest({
                code:'10002',
                message:'请填写正确的手机号～～～'
            })
            return;
        }else{
            const user = await api.affirmUser({
                telephone:ctx.request.body.telephone,
                password:ctx.request.body.password
            })
            const u = JSON.stringify(user);
            const userP = JSON.parse(u)
            if(userP.length == 0){
                ctx.rest({
                    code:'1001',
                    message:'亲亲，注册完再来哟～～～'
                })
            }else if(userP && userP[0].password == ctx.request.body.password){
                ctx.rest({
                        code:'0000',
                        data:operateToken.createToken(ctx.request.body.telephone),
                        message:'操作成功'
                    })
            }else{
                ctx.rest({
                        code:'1002',
                        message:'密码不正确'
                    })
            }
        }
    },

}