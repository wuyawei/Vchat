module.exports = path => () => import('@/views/' + path + '.vue');
// module.exports = path => r => require.ensure([], () => r(require('@/views/' + path + '.vue')));