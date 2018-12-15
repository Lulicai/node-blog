const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const controller = require('./middleware/controller');

const model = require('./middleware/model');

let User = model.user;
// let sync = model.sync;
// sync()

//输出处理的请求连接

app.use(async(ctx,next)=>{
    console.log(`process ${ctx.request.method} ${ctx.request.url}`);
    await next();
})

app.use(bodyParser());

app.use(controller())
app.listen(3000,()=>{
    console.log('start listen 3000....');
});