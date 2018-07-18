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
            path: '/personalMain',
            name: 'personalMain',
            component: _import('personalMain'),
            redirect: 'personalMain/group',
            children: [
                {
                    path: 'group',
                    name: 'group',
                    component: _import('model/group')
                },
                {
                    path: 'conversation',
                    name: 'conversation',
                    component: _import('model/conversation')
                },
                {
                    path: 'friendly',
                    name: 'friendly',
                    component: _import('model/friendly')
                }
            ]
        }
    ]
})
