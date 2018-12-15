//给上下文对象（context）绑定rest 方法，处理数据

module.exports = {
    restify:function(pathPrefix){
        pathPrefix = pathPrefix || '/api/';
        return async (ctx,next)=>{
            if(ctx.request.path.startsWith(pathPrefix)){
                // console.log(333333)
                // console.log(10,ctx)
                ctx.rest = (data)=>{
                    ctx.response.body = data;
                    ctx.response.type = 'application/json';
                }
                try{
                    await next()
                }catch(err){
                    // console.log(16,err)
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: err.code || 'internal:unknown_error',
                        message: err.message || ''
                    };
                }
            }else{
                await next()
            }
        }
    },
    APIError:function(code,message){
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    }
}