const CommonListModel = require("../model/commonList.js")
const addCollectionList = (req,res) => {
    CommonListModel.addCommonList((result) => {
        res.json({
            ret : true,
            data : {
                result : result
            }
        })
    })
}

const getIndexData = (req,res) => {
    CommonListModel.getIndexData((result) => {
        res.json({
            ret : true,
            data : {
                result : result
            }
        })
    })
}

const getXqData = (req,res) => {
    CommonListModel.getXqData((result) => {
        res.json({
            ret : true,
            data : {
                result : result
            }
        })
    })
}

const getdetailData = (req,res) => {
    CommonListModel.getdetailData((result) => {
        res.json({
            ret : true,
            data : {
                result : result
            }
        })
    })
}

const getRgister = (req, res) => {
    const {telname, keyname} = req.query
    CommonListModel.getUserInfo(telname, keyname,(response) => {
        if(response) {
            res.json({
                'ret': true,
                'response': true

            })
        }else {
            res.json({
                'ret': true,
                'response': false

            })
        }
    } )
}

const getLogin = (req, res) => {
    const {telname, keyname} = req.query
    CommonListModel.getUserInfos(telname, keyname,(responses) => {
        if(responses) {
            res.json({
                'ret': true,
                'responses': true

            })
        }else {
            res.json({
                'ret': true,
                'responses': false

            })
        }
    } )
}

module.exports = {
    addCollectionList,
    getIndexData,
    getXqData,
    getdetailData,
    getRgister,
    getLogin
}