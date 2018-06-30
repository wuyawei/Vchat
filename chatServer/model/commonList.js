const db = require('../utils/database.js')
var CommonLists = db.model("commonList",{
    list : Array,
    ordinaryList : Array,
    teachList : Array,
    slowlyList : Array,
},"commonList")

const addCommonList = (callback) => {
    CommonLists.find({})
        .then((res) => {
            callback(res)
        })
}

var indexData = db.model("indexList",{
    list : Array,
    friendList : Array
},"indexList")

const getIndexData = (callback) => {
    indexData.find({})
        .then((res) => {
            callback(res)
        })
}

var xqData = db.model("listList",{
    leftlist : Array,
    rightlist : Array
},"listList")

const getXqData = (callback) => {
    xqData.find({})
        .then((res) => {
            callback(res)
        })
}

var detailData = db.model("detailList",{
     toplist : Array,
     lastlist : Array
},"detailList")

const getdetailData = (callback) => {
    detailData.find({})
        .then((res) => {
            callback(res)
        })
}

var user = db.model("userList", {
    telname: String,
    keyname: String
}, "userList")

const getUserInfo = (telname, keyname, callback) => {
    const users = new user({
        telname: telname,
        keyname: keyname
    })
    users.save().then((res) => {
        //console.log(res)
        callback(res)
    })
}


const getUserInfos = (telname, keyname, callback) => {
    user.findOne({telname:telname, keyname:keyname})
    .then((res) => {
         console.log(res)
        callback(res)
    } )
}

module.exports = {
    addCommonList,
    getIndexData,
    getXqData,
    getdetailData,
    getUserInfo,
    getUserInfos
}
