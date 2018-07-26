let  multer=require('multer');
let storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});
//添加配置文件到muler对象。
let upload = multer({
    storage: storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//var upload = multer({
//    storage: storage,
//    limits:{}
// });

// 备用js 暂无使用
module.exports = upload;