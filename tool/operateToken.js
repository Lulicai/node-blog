const jwt = require('jsonwebtoken')

module.exports = {
    checkToken:function(ctx,next){
        if(token){
            let decoded = jwt.decode(token,'secret');
            // 如果过期了就重新登录
        // 验证token也需要优化
            if (token && decoded.exp <= Date.now() / 1000) {
                ctx.body = {
                    code: 401,
                    message: "授权已经过期，请重新登陆"
                };
                return;
            }else{
                next()
            }
        }
    },
    createToken:function(tel){
        var expiry = new Date();
        expiry.setDate(expiry.getDate()+7);//有效期设置为七天
        const token = jwt.sign({
            tel:tel,
            exp:parseInt(expiry.getTime()/1000)//除以1000以后表示的是秒数 到期时间
        },'secret')
        return token
    }
}