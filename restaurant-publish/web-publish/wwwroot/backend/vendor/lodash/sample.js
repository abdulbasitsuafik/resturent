var arraySample=require("./_arraySample"),baseSample=require("./_baseSample"),isArray=require("./isArray");function sample(r){return(isArray(r)?arraySample:baseSample)(r)}module.exports=sample;