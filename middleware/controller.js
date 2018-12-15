//处理路由的middleware

const fs = require("fs")

function addMapping(router,mapping){
    for(let url in mapping){
        if(url.startsWith('GET ')){
            var path = url.substring(4);
            router.get(path,mapping[url])
        }else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path,mapping[url])
        }else if(url.startsWith('PUT ')){
            var path = url.substring(4);
            router.put(path,mapping[url])
        }else if(url.startsWith('DELETE ')){
            var path = url.substring(7);
            router.delete(path,mapping[url])
        }else{
            console.log('invilide url')
        }
    }
}

function addController(router,dir){
    const dirpath = __dirname.substring(0,__dirname.length-10);
    // console.log(6,__dirname.substring(0,dirpath.length-10))
    fs.readdirSync(dirpath+dir).filter((fs)=>{
        return fs.endsWith('.js')
    }).forEach((f)=>{
        let mapping = require(dirpath+dir+'/'+f);
        addMapping(router,mapping)
    })
}

module.exports = function(dir){
    const contrller_dir = dir || "controllers"; 
    const router = require('koa-router')();
    addController(router,contrller_dir);
    return router.routes();
}