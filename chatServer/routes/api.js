/**
 * Created by wyw on 2018/9/25.
 */
let express = require('express');
let router = express.Router();

// const multer=require('multer'); // 文件上传 第一种上传方案所需
const fs=require('fs');
const os=require('os');
const path=require("path");
// let upload = multer({dest: './public/uploads/'}); // os.tmpdir() 跨磁盘有权限问题 第一种上传方案所需
const uploads = require('../utils/upload'); // 上传js

// 新路径要写真实路径，文件夹不存在multer不会主动创建
// const uploadInmage = (req, res)=>{ // 第一种上传方案所需
//     fs.rename(
//         req.file.path,
//         path.join('./public/uploads/' + Date.now() + '-' + req.file.originalname),
//         (err)=>{
//             if (err) {
//                 res.json({
//                     code: -1,
//                     data: '上传失败'
//                 });
//                 throw err;
//             }
//             res.json({
//                 code: 0,
//                 data: '/uploads/' + Date.now() + '-' + req.file.originalname
//             });
//         }
//     );
// };

// f  前端文件上传name必须为f
// router.post('/uploadInmage', upload.single('f'), uploadInmage); // 第一种上传方案所需
router.post('/uploadFile', uploads.uploadFile.single('f'), (req, res) => { // 第二种上传方案
    res.json({
        code: 0,
        data: '/uploads/' + req.file.filename
    });
});

module.exports = router;