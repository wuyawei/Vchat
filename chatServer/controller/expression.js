
const apiModel = require("../model/apiModel");

const getExpression = (req, res) => {
    apiModel.getExpression(req.body, r => {
        res.json(r);
    })
};

module.exports = {
    getExpression
};