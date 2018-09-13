<template>
    <div class="vchat-mySetting">
        <div class="vchat-mySetting-header">
            <router-link to="/personalMain">vchat</router-link>
            <div class="avtor">
                <a href="javascipt:;">
                    <img :src="IMG_URL + $store.state.user.photo" alt="">
                </a>
                <span @click="loginOut" class="logout">[退出]</span>
            </div>
        </div>
        <div class="vchat-mySetting-container vchat-flexBetween">
            <ul class="vchat-setingList">
                <li v-for="(v, i) in setingList" :key="i" :class="{active: $route.path === v.link}">
                    <router-link :to="v.link">
                        <i class="iconfont" :class="[v.class ? v.class : '']"></i>
                        <span>{{v.name}}</span>
                    </router-link>
                </li>
            </ul>
            <div class="vchat-seting-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../api';
    export default{
        name: 'mySetting',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                setingList: [
                    {
                        name: '个人资料',
                        link: '/mySetting/means',
                        class: 'icon-gerenziliao3'
                    },
                    {
                        name: '主题设置',
                        link: '/mySetting/theme',
                        class: 'icon-zhuti'
                    },
                    {
                        name: '聊天壁纸',
                        link: '/mySetting/wallpaper',
                        class: 'icon-huanbeijing'
                    },
                    {
                        name: '聊天气泡',
                        link: '/mySetting/bubble',
                        class: 'icon-yuyin'
                    }
                ]
            }
        },
        methods: {
            loginOut() {
                api.loginOut().then(r => {
                    if (r.code === 0) {
                        this.$message.success('退出成功');
                        this.$store.commit('setUser', 'out');
                        this.$router.replace('/');
                    }
                });
            }
        },
        mounted() {

        }
    }
</script>
<style lang="scss">
    .vchat-mySetting{
        width:100%;
    }
    .vchat-mySetting-header{
        width:100%;
        height: 40px;
        padding: 0 30px;
        text-align: left;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >a{
            font-size: 20px;
            line-height: 40px;
            color: #fff;
        }
        .avtor{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            a{
                display: block;
                width:40px;
                height: 40px;
                margin-right: 10px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width:100%;
                }
            }
        }
        span{
            cursor: pointer;
        }
    }
    .vchat-mySetting-container{
        width:1200px;
        margin: 0 auto;
        padding: 30px 0;
        .vchat-setingList{
            width:320px;
            padding: 0 30px;
            box-sizing: border-box;
            li{
                width:100%;
                cursor: pointer;
                border-radius: 2px;
                text-align: left;
                a{
                    display: block;
                    color: #323232;
                    padding: 12px 0;
                    box-sizing: border-box;
                    padding-left: 20px;
                }
                i{
                    font-size: 28px;
                    margin-right: 6px;
                    vertical-align: middle;
                }
            }
            li:hover{
                background-color: #f0f0f0;
            }
            li.active{
                background-color: #3aa1ca;
            }
            li.active a{
                color: #fff;
            }
        }
        .vchat-seting-container{
            width:880px;
            background-color: #f5f5f5;
            border-radius: 2px;
        }
    }
</style>