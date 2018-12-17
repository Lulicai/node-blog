const model = require('../middleware/model');
const APIError = require('../middleware/rest').APIError
let User = model.user;

module.exports = {
    createUser: async ({telephone,password})=>{
        try{
            const findUser = await User.findAll({
                where:{
                    telephone:telephone
                }
            })
            // console.log(13,findUser)
            if(findUser.length == 0){
                const user = await User.create({
                    telephone: telephone,
                    password: password,
                    remark:''
                })
                return user;
            }else{
                return '该用户已存在';
            }
        }catch(err){
            //捕捉报错
            // console.log(25,err)
            throw new APIError('1003','系统出错啦，稍后再试啊～～')
        }    
    },
    affirmUser: async({telephone,password})=>{
        try{
            const findUser = await User.findAll({
                where:{
                    telephone:telephone
                }
            })
            return findUser
        }catch(err){
            //捕捉报错
            throw new APIError('1003','系统出错啦，稍后再试啊～～')
        }
    }
}