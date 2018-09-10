<template>
    <div class="vchat-personalMain">
        <div class="vchat-header">
            <div class="vchat-logo">vchat</div>
            <div class="vchat-mine">
                <div>
                    <a href="">
                        <img :src="IMG_URL + '/img/picture.png'" alt="">
                    </a>
                    <ul class="handleList">
                        <li v-for="(v, i) in handleList" :key="i">
                            <router-link :to="v.link">
                                <i class="iconfont" :class="[v.icon ? v.icon : '']"></i>
                                {{v.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p>吴所谓呀 <span @click="loginOut" class="logout">[退出]</span></p>
                    <p class="online">在线</p>
                </div>
            </div>
        </div>
        <div class="vchat-content">
            <div class="vchat-content-nav">
                <ul>
                    <li v-for="v in nav" :key="v.id" :class="{active: $route.path === v.link}">
                        <router-link :to="{path: v.link}">
                            <i class="iconfont" :class="[$route.path !== v.link ? v.class : v.activeClass]"></i>
                            <p>{{v.name}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="vchat-content-view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../api';
    export default{
        name: '',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                nav: [
                    {
                        name: '会话',
                        class: 'icon-message',
                        activeClass: 'icon-message_fill',
                        id: 1,
                        link: '/personalMain/conversation'
                    },
                    {
                        name: '好友',
                        class: 'icon-people',
                        activeClass: 'icon-people_fill',
                        id: 2,
                        link: '/personalMain/friendly'
                    },
                    {
                        name: '群组',
                        class: 'icon-group',
                        activeClass: 'icon-group_fill',
                        id: 3,
                        link: '/personalMain/group'
                    }
                ],
                handleList: [
                    {
                        name: '个人主页',
                        icon: 'icon-zhanghaoguanli1',
                        link: '/mine'
                    },
                    {
                        name: '设置',
                        icon: 'icon-shezhi1',
                        link: '/mySetting'
                    }
                ]
            }
        },
        sockets: {
            connect: function (val) {
                console.log(this.$socket.id);
                console.log('连接成功');
            },
            customEmit: function (val) {
                console.log('连接失败');
            }
        },
        methods: {
            loginOut() {
                api.loginOut().then(r => {
                    if (r.code === 0) {
                        this.$message.success('退出成功');
                        this.$store.commit('setUser', '');
                        this.$router.replace('/');
                    }
                });
            }
        },
        mounted() {
            this.$store.dispatch('getUserInfo');
        }
    }
</script>
<style scoped lang="scss">
    .vchat-personalMain {
        width: 100%;
        height: 100%;
        /*background-image: url("../assets/img/1.jpg");*/
        /*background-repeat: no-repeat;*/
        /*background-position: center;*/
        .vchat-header {
            width: 100%;
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .vchat-logo {
                width: 120px;
                height: 80px;
                /*color: #fff;*/
                font-size: 28px;
                line-height: 80px;
            }
            .vchat-mine {
                min-width: 300px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                >div:nth-of-type(1){
                    width: 80px;
                    height: 70px;
                    padding: 5px 10px;
                    box-sizing: border-box;
                    margin-right: 20px;
                    border-radius: 2px;
                    position: relative;
                }
                >div:nth-of-type(1)> a {
                    display: block;
                    width:100%;
                    height: 100%;
                    overflow: hidden;
                    border-radius: 50%;
                    border: 1px solid #d5d5d5;
                    img {
                        width: 100%;
                    }
                }
                >div:nth-of-type(1):hover{
                    background-color: #f5f5f5;
                }
                .handleList{
                    width: 158px;
                    background-color: #fff;
                    position: absolute;
                    left:0;
                    top:70px;
                    display: none;
                    z-index: 100;
                    border-radius: 2px;
                    box-shadow: 0 1px 3px #f5f5f5;
                    padding: 10px 0;
                    box-sizing: border-box;
                }
                .handleList li{
                    width:100%;
                    line-height: 42px;
                    font-size: 16px;
                    text-align: left;
                    padding: 0 20px;
                    box-sizing: border-box;
                    cursor: pointer;
                    i{
                        font-size: 18px;
                        margin-right: 10px;
                    }
                }
                .handleList li a{
                    display: block;
                }
                >div:nth-of-type(1):hover .handleList{
                    display: block;
                }
                > div:nth-of-type(2) {
                    height: 50px;
                    font-size: 16px;
                    color: #fff;
                    text-align: left;
                    p:nth-of-type(1) {
                        margin-bottom: 5px;
                        span {
                            margin-left: 10px;
                            cursor: pointer;
                        }
                        span:hover {
                        }
                    }
                    p:nth-of-type(2) {
                        font-size: 14px;
                    }
                }
            }
        }
        .vchat-content {
            width: 100%;
            height: calc(100% - 80px);
            min-height: 600px;
            display: flex;
            justify-content: flex-start;
            .vchat-content-nav {
                width: 120px;
                height: 100%;
                ul {
                    width: 100%;
                    li {
                        padding: 15px 0;
                        cursor: pointer;
                        a {
                            display: block;
                            text-decoration: none;
                            i {
                                font-size: 32px;
                                margin-bottom: 5px;
                            }
                            p {
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
            .vchat-content-view {
                width: calc(100% - 120px);
                min-width: 1125px;
                height: 100%;
                padding: 20px 30px 30px;
                box-sizing: border-box;
            }
        }
    }
</style>