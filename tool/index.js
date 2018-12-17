//各种验证
module.exports = {
    checkNone:function(data){
        if(!data){
            //验证为空
            return true
        }
        return false
    },
    checkTel:function(data){
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(data)){
            return true
        }
        return false;
    }
}

