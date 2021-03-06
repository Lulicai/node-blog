//用户管理的接口操作部分
const checkdata = require('../tool')
const api = require('../api');
const operateToken = require('../tool/operateToken');
var sha1 = require('sha1');
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
        }else if(checkdata.checkNone(sha1(ctx.request.body.password))){
            ctx.rest({
                code:'10002',
                message:'密码不能为空哟～～～'
            })
            return;
        }else{
            let user = {
                telephone:ctx.request.body.telephone,
                password:sha1(ctx.request.body.password),
                rank:ctx.request.body.rank,
                status:ctx.request.body.status,
                remark:ctx.request.body.remark
            }
            const data = await api.createUser(user)
            // console.log(31,JSON.parse(JSON.stringify(data)))
            const res = JSON.parse(JSON.stringify(data));
            if(res[1]){
                ctx.rest({
                    code:'0000',
                    token:operateToken.createToken(ctx.request.body.telephone),
                    rank:res[0].rank,
                    message:'操作成功'
                });
            }else{
                ctx.rest({
                    code:'1002',
                    message:'亲亲，您已经注册了哟～～'
                });
            }
        }
    },
    'POST /api/login':async(ctx,next)=>{
        //前端提交过来的数据
        if(checkdata.checkNone(ctx.request.body.telephone)){
            ctx.rest({
                code:'1002',
                message:'手机号不能为空哟～～～'
            })
            return;
        }else if(checkdata.checkTel(ctx.request.body.telephone)){
            ctx.rest({
                code:'1002',
                message:'请填写正确的手机号～～～'
            })
            return;
        }else{
            const user = await api.affirmUser({
                telephone:ctx.request.body.telephone,
                password:sha1(ctx.request.body.password)
            })
            const u = JSON.stringify(user);
            const userP = JSON.parse(u)
            // console.log(69,userP)
            if(userP.length == 0){
                ctx.rest({
                    code:'1001',
                    message:'亲亲，注册完再来哟～～～'
                })
            }else if(userP && userP[0].password == sha1(ctx.request.body.password)){
                ctx.rest({
                        code:'0000',
                        token:operateToken.createToken(ctx.request.body.telephone),
                        rank:userP[0].rank,
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
    'POST /api/getUserInfo':async(ctx,next)=>{
        let teldata = operateToken.checkToken(ctx.request.body.token)
        if(teldata.code){
            ctx.rest({
                code:401,
                message:'授权已经过期，请重新登录哦亲～～'
            })
            return;
        }else{
            let data = {
                token:teldata.tel
            }
           const getdata = await api.getUserInfo(data);
           let info = {
               id: getdata[0].id,
               rank: getdata[0].rank,
               telephone: getdata[0].telephone,
           }
           ctx.rest({
                code:'0000',
                data:info,
                message:'发布成功'
            })
        }
    }

}