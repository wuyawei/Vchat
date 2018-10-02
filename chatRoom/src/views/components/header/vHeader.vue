<template>
    <div class="vchat-header">
        <div class="vchat-logo">vchat</div>
        <div class="vchat-mine">
            <div>
                <a href="javascript:;">
                    <img :src="avatar" alt="">
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
                <p>
                    <span class="vchat-line1" :title="user.nickname">{{user.nickname}}</span>
                    <span @click="loginOut" class="logout">[退出]</span>
                </p>
                <p class="vchat-line2" :title="user.signature">{{user.signature ? '个性签名：' + user.signature : '这个人很懒，暂时没有签名哦！'}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api';
    export default{
        name: 'vHeader',
        data() {
            return {
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
            };
        },
        computed: {
            avatar() {
                return process.env.IMG_URL + this.$store.state.user.photo; // 用户头像avatar:
            },
            user() {
                return this.$store.state.user;
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
        }
    }
</script>
<style lang="scss" scoped>
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
            > div:nth-of-type(1) {
                width: 80px;
                height: 70px;
                padding: 5px 10px;
                box-sizing: border-box;
                margin-right: 20px;
                border-radius: 2px;
                position: relative;
            }
            > div:nth-of-type(1) > a {
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: 50%;
                border: 1px solid #d5d5d5;
                img {
                    width: 100%;
                }
            }
            > div:nth-of-type(1):hover {
                background-color: #f5f5f5;
            }
            .handleList {
                width: 158px;
                background-color: #fff;
                position: absolute;
                left: 0;
                top: 70px;
                display: none;
                z-index: 100;
                border-radius: 2px;
                box-shadow: 0 1px 3px #f5f5f5;
                padding: 10px 0;
                box-sizing: border-box;
            }
            .handleList li {
                width: 100%;
                line-height: 42px;
                font-size: 16px;
                text-align: left;
                padding: 0 20px;
                box-sizing: border-box;
                cursor: pointer;
                i {
                    font-size: 18px;
                    margin-right: 10px;
                }
            }
            .handleList li a {
                display: block;
            }
            > div:nth-of-type(1):hover .handleList {
                display: block;
            }
            > div:nth-of-type(2) {
                height: 50px;
                font-size: 16px;
                color: #fff;
                text-align: left;
                p:nth-of-type(1) {
                    margin-bottom: 5px;
                    padding-right: 10px;
                    display: flex;
                    align-items: center;
                    span:nth-of-type(1) {
                        max-width: 200px;
                        display: inline-block;
                    }
                    span:nth-of-type(2) {
                        margin-left: 10px;
                        cursor: pointer;
                        line-height: 1;
                    }
                }
                p:nth-of-type(2) {
                    font-size: 12px;
                    max-width: 200px;
                }
            }
        }
    }
</style>