//扫描所有的model统一处理
const fs = require('fs');
const db = require('../db/db');
const dirpath = __dirname.substring(0,__dirname.length-10)

let files = fs.readdirSync(dirpath+'/models');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
});

module.exports = {}

for(let f of js_files){
    let name = f.substring(0,f.length-3);
    module.exports[name] = require(dirpath + '/models/' + f);
}

module.exports.sync = () => {
    db.sync();
};