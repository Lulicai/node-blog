const model = require('../middleware/model');

let User = model.user;
// console.log('created: ' + JSON.stringify(user)); 
    // var ooo = await User.update({
    //     password:'9999',
    //     // updateAt:Date.now()
    // },{
    //     where: {
    //       telephone:'111111111'
    //     }
    //   }
    // )
    // console.log('update: ' + JSON.stringify(ooo)); 

module.exports = {
    createUser: async ({telephone,password})=>{
        try{
            const findUser = await User.findAll({
                where:{
                    telephone:telephone
                }
            })
            if(findUser.length == 0){
                const user = await User.create({
                    telephone: telephone,
                    password: password,
                    remark:''
                })
                return user;
            }else{
                return {
                    code:'1001',
                    message:'亲亲，该用户已存在哟～～～'
                }
            }
            // console.log(24,user)
        }catch(err){
            //捕捉报错
            return {
                code:'1000',
                message:'系统出错啦，稍后再试啊～～'
            }
        }    
    }
}