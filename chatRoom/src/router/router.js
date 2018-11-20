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
            path: '/main',
            name: 'main',
            component: _import('main'),
            redirect: 'main/personalMain',
            children: [
                {
                    path: 'personalMain',
                    name: 'personalMain',
                    component: _import('personalMain'),
                    redirect: 'personalMain/friendly',
                    children: [
                        {
                            path: 'group',
                            name: 'group',
                            component: _import('personalModel/group'),
                            redirect: 'group/own',
                            children: [
                                {
                                    path: 'set',
                                    name: 'setGroup',
                                    component: _import('personalModel/groupModel/setGroup')
                                },
                                {
                                    path: 'own',
                                    name: 'ownGroup',
                                    component: _import('personalModel/groupModel/ownGroup')
                                },
                                {
                                    path: 'search',
                                    name: 'searchGroup',
                                    component: _import('personalModel/groupModel/searchGroup')
                                },
                                {
                                    path: 'detail/:id',
                                    name: 'groupDetail',
                                    component: _import('personalModel/groupModel/groupDetail')
                                },
                                {
                                    path: 'apply/:id',
                                    name: 'applyGroup',
                                    component: _import('personalModel/groupModel/applyGroup')
                                },
                                {
                                    path: 'send',
                                    name: 'sendGroupValidate',
                                    component: _import('personalModel/sendValidateSuccess')
                                }
                            ]
                        },
                        {
                            path: 'friendly',
                            name: 'friendly',
                            component: _import('personalModel/friendly'),
                            redirect: 'friendly/own',
                            children: [
                                {
                                    path: 'own',
                                    name: 'ownFriend',
                                    component: _import('personalModel/friendModel/myFriend')
                                },
                                {
                                    path: 'detail/:id',
                                    name: 'friendDetail',
                                    component: _import('personalModel/friendModel/friendDetail')
                                },
                                {
                                    path: 'apply',
                                    name: 'applyFriend',
                                    component: _import('personalModel/friendModel/applyFriend')
                                },
                                {
                                    path: 'search',
                                    name: 'searchFriend',
                                    component: _import('personalModel/friendModel/searchFriend')
                                },
                                {
                                    path: 'send',
                                    name: 'sendFriendValidate',
                                    component: _import('personalModel/sendValidateSuccess')
                                },
                                {
                                    path: 'wall/:id',
                                    name: 'photoWall',
                                    component: _import('personalModel/friendModel/photoWall')
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'application',
                    name: 'application',
                    component: _import('application')
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
                    path: 'theme',
                    name: 'theme',
                    component: _import('settingModel/theme')
                }
            ]
        },
        {
            path: '*',
            component: _import('notFound'),
        }
    ]
})
