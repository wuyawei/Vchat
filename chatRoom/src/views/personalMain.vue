<template>
    <div class="vchat-personalMain">
        <v-header></v-header>
        <div class="vchat-content">
            <div class="vchat-content-nav">
                <ul>
                    <li v-for="v in nav" :key="v.id" :class="{active: $route.path.indexOf(v.link) > -1}">
                        <router-link :to="{path: v.link}">
                            <i class="iconfont" :class="[$route.path !== v.link ? v.class : v.activeClass]"></i>
                            <p>{{v.name}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="vchat-content-left-view">
                <router-view></router-view>
            </div>
            <div class="vchat-content-right-view">
                应用空间
            </div>
        </div>
    </div>
</template>
<script>
    import vHeader from '@/views/components/header/vHeader';
    export default{
        name: '',
        data() {
            return {
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
            }
        },
        components: {
            vHeader
        },
        computed: {
            user() {
                return this.$store.state.user;
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
        },
        mounted() {
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
            .vchat-content-left-view {
                width: 320px;
                height: 100%;
                padding: 20px 0 30px;
                box-sizing: border-box;
                margin-left: 20px;
            }
            .vchat-content-right-view{
                width: calc(100% - 520px);
                padding: 20px 0 30px;
                min-width: 820px;
                height: 100%;
                background-color: #fff;
                box-sizing: border-box;
                margin-left: 30px;
            }
        }
    }
</style>