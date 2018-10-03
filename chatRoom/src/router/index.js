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
            path: '/personalMain',
            name: 'personalMain',
            component: _import('personalMain'),
            redirect: 'personalMain/group',
            children: [
                {
                    path: 'group',
                    name: 'group',
                    component: _import('personalModel/group'),
                    redirect: 'group/ownGroup',
                    children: [
                        {
                            path: 'setGroup',
                            name: 'setGroup',
                            component: _import('personalModel/groupModel/setGroup')
                        },
                        {
                            path: 'ownGroup',
                            name: 'ownGroup',
                            component: _import('personalModel/groupModel/ownGroup')
                        },
                        {
                            path: 'search',
                            name: 'searchGroup',
                            component: _import('personalModel/groupModel/searchGroup')
                        },
                        {
                            path: 'groupDetail/:id',
                            name: 'groupDetail',
                            component: _import('personalModel/groupModel/groupDetail')
                        },
                        {
                            path: 'applyGroup/:id',
                            name: 'applyGroup',
                            component: _import('personalModel/groupModel/applyGroup')
                        }
                    ]
                },
                {
                    path: 'conversation',
                    name: 'conversation',
                    component: _import('personalModel/conversation')
                },
                {
                    path: 'friendly',
                    name: 'friendly',
                    component: _import('personalModel/friendly')
                }
            ]
        },
        {
            path: '/mine',
            name: 'mine',
            component: _import('mine')
        },
        {
            path: '/mySetting',
            name: 'mySetting',
            component: _import('mySetting'),
            redirect: 'mySetting/means',
            children: [
                {
                    path: 'means',
                    name: 'means',
                    component: _import('settingModel/means')
                },
                {
                    path: 'bubble',
                    name: 'bubble',
                    component: _import('settingModel/bubble')
                },
                {
                    path: 'theme',
                    name: 'theme',
                    component: _import('settingModel/theme')
                },
                {
                    path: 'wallpaper',
                    name: 'wallpaper',
                    component: _import('settingModel/wallpaper')
                }
            ]
        }
    ]
})
