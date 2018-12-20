const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
var cors = require('koa2-cors');
const controller = require('./middleware/controller');
const rest = require('./middleware/rest');
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

app.use(rest.restify());

app.use(cors({
    origin: function (ctx) {
        return "*"; // 允许来自所有域名请求
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(controller());

app.listen(3000,()=>{
    console.log('start listen 3000....');
});