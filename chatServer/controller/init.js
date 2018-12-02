const initModel = require("../model/init.js"); // 初始化数据库表
let db = {
        initUser(){
            return new Promise((resolve, reject) => {
                initModel.initUser((result) => { // 初始化users表
                    this.userid = result['_id'];
                    resolve();
                })
            })
        },
        initEmoji(filePath) { // 初始化表情包
            initModel.initEmoji(filePath);
        },
        call() {
            this.initUser().then(_ => {return this.initRoom()}).then(_ => {
                this.initMessage();
            })
        }
};

// db.initUser();
db.initEmoji('../public/expression');