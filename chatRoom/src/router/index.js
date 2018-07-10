import Vue from 'vue';
import Router from 'vue-router';
import _import from './_import';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: _import('login')
        },
        {
            path: '/chat',
            name: 'chat',
            component: _import('chat')
        },
        {
            path: '/roomList',
            name: 'roomList',
            component: _import('roomList')
        }
    ]
})
