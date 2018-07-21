<template>
    <div class="vchat-personalMain">
        <div class="vchat-header">
            <div class="vchat-logo">vchat</div>
            <div class="vchat-mine">
                <a href="">
                    <img src="../assets/img/6.jpg" alt="">
                </a>
                <div>
                    <p>吴所谓呀 <span @click="loginOut">[退出]</span></p>
                    <p>在线</p>
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
    export default{
        name: '',
        data() {
            return {
                nav: [
                    {name: '会话', class: 'icon-message', activeClass: 'icon-message_fill', id: 1, link: '/personalMain/conversation'},
                    {name: '好友', class: 'icon-people', activeClass: 'icon-people_fill', id: 2, link: '/personalMain/friendly'},
                    {name: '群组', class: 'icon-group', activeClass: 'icon-group_fill', id: 3, link: '/personalMain/group'}
                ]
            }
        },
        sockets:{
            connect: function(val){
                console.log(this.$socket.id);
                console.log('连接成功');
            },
            customEmit: function(val){
                console.log('连接失败');
            }
        },
        methods: {
            loginOut() {
                this.$router.replace('/');
            }
        }
    }
</script>
<style scoped lang="scss">
    .vchat-personalMain{
        width:100%;
        height: 100%;
        .vchat-header{
            width:100%;
            height: 80px;
            background-color: #27cac7;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .vchat-logo{
                width:120px;
                height: 80px;
                color: #fff;
                font-size: 28px;
                line-height: 80px;
            }
            .vchat-mine{
                min-width:300px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                >a{
                    display: block;
                    width:60px;
                    height: 60px;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: #00ffff;
                    margin-right: 20px;
                    img{
                        width:100%;
                    }
                }
                >div{
                    height: 50px;
                    font-size: 16px;
                    color: #fff;
                    text-align: left;
                    p:nth-of-type(1) {
                        margin-bottom: 5px;
                        span{
                            margin-left: 10px;
                            color: #a4f5f6;
                            cursor: pointer;
                        }
                        span:hover{
                            color: #63f6f5;
                        }
                    }
                    p:nth-of-type(2) {
                        font-size: 14px;
                        color: #1cffc5;
                    }
                }
            }
        }
        .vchat-content{
            width:100%;
            height: calc(100% - 80px);
            min-height: 600px;
            background-color: #f5f5f5;
            display: flex;
            justify-content: flex-start;
            .vchat-content-nav{
                width:120px;
                height: 100%;
                background-color: #fff;
                box-shadow: 2px 0 10px #d5d5d5;
                ul{
                    width:100%;
                    li{
                        padding: 15px 0;
                        cursor: pointer;
                        a{
                            display: block;
                            color: #d5d5d5;
                            text-decoration: none;
                            i{
                                font-size: 32px;
                                margin-bottom: 5px;
                            }
                            p{
                                font-size: 12px;
                            }
                        }
                    }
                    li.active{
                        a{
                            color: #27cac7;
                        }
                    }
                }
            }
            .vchat-content-view{
                width:calc(100% - 120px);
                min-width: 1125px;
                height: 100%;
                padding: 20px 30px 30px;
                box-sizing: border-box;
            }
        }
    }
</style>