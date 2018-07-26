const api = require('../controller/apiList');
const multer=require('multer');
const fs=require('fs');
const os=require('os');
const path=require("path");

let express = require('express');
let router = express.Router();
let upload = multer({dest: './public/uploads/'}); // os.tmpdir() 跨磁盘有权限问题

router.get('/getUser', api.getUser); // 获取用户、测试接口
router.post('/login', api.login); // 登录
router.post('/signUp', api.signUp); // 注册
router.post('/loginOut', api.loginOut); // 退出
router.post('/getUserInfo', api.getUserInfo); // 登录状态获取用户信息

// 新路径要写真实路径，文件夹不存在multer不会主动创建
const uploadInmage = (req, res)=>{
    fs.rename(
        req.file.path,
        path.join('./public/uploads/' + Date.now() + '-' + req.file.originalname),
        (err)=>{
            if (err) {
                res.json({
                    code: -1,
                    data: '上传失败'
                });
                throw err;
            }
            res.json({
                code: 0,
                data: '/uploads/' + Date.now() + '-' + req.file.originalname
            });
        }
    );
};

router.post('/uploadInmage', upload.single('f'), uploadInmage);

module.exports = router;
