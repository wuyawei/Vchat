'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    IMG_URL: '"http://localhost:9988"',
    SOCKETIO: '"https://im.i-zuche.cn/"'
});
