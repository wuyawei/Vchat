const initModel = require("../model/init.js"); // 初始化数据库表
let db = {
        roomid: '',
        userid: '',
        initUser(){
            return new Promise((resolve, reject) => {
                initModel.initUser((result) => { // 初始化users表
                    this.userid = result['_id'];
                    resolve();
                })
            })
        },
        initRoom(){
            return new Promise((resolve, reject) => {
                initModel.initRoom((result) => { // 初始化rooms表
                    this.roomid = result['_id'];
                    resolve();
                });
            })
        },
        initMessage(){
            initModel.initMessage((result) => { // 初始化message表
                console.log('msgid===>', result['_id']);
            }, {roomid: this.roomid, userid: this.userid})
        },
        call() {
            this.initUser().then(_ => {return this.initRoom()}).then(_ => {
                this.initMessage();
            })
        }
};

db.initUser();