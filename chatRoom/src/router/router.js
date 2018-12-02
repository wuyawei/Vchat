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
                    component: _import('application'),
                    redirect: 'application/space',
                    meta: {
                        title: '应用空间',
                        name: 'appSpace'
                    },
                    children: [
                        {
                            path: 'space',
                            name: 'appSpace',
                            component: _import('applicationModel/appSpace'),
                        },
                        {
                            path: 'jokes',
                            name: 'Jokes',
                            component: _import('applicationModel/Jokes'),
                            meta: {
                                title: '侃段子',
                                name: 'Jokes'
                            }
                        },
                        {
                            path: 'videoGallery',
                            name: 'videoGallery',
                            component: _import('applicationModel/videoGallery'),
                            meta: {
                                title: '看视频',
                                name: 'videoGallery'
                            }
                        },
                        {
                            path: 'games',
                            name: 'games',
                            component: _import('applicationModel/games'),
                            meta: {
                                title: '玩游戏',
                                name: 'games'
                            }
                        },
                        {
                            path: 'news',
                            name: 'news',
                            component: _import('applicationModel/news'),
                            meta: {
                                title: '看头条',
                                name: 'news'
                            }
                        },
                        {
                            path: 'newsDetailSub',
                            name: 'newsDetail',
                            component: _import('applicationModel/newsDetail'),
                            meta: {
                                title: '新闻详情',
                                name: 'newsDetail'
                            }
                        },
                        {
                            path: '2048Sub',
                            name: 'h2048',
                            component: _import('applicationModel/games/HTML5_2048/2048'),
                            meta: {
                                title: '2048',
                                name: 'h2048'
                            }
                        },
                        {
                            path: 'txzSub',
                            name: 'txz',
                            component: _import('applicationModel/games/txz/txz'),
                            meta: {
                                title: '推箱子',
                                name: 'txz'
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/mine',
            name: 'mine',
            component: _import('mine')
        },
        {
            path: '/todo',
            name: 'todo',
            component: _import('todo')
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
