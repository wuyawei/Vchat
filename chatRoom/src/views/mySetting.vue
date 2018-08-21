<template>
    <div class="vchat-mySetting vchat-flexBetween">
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
</template>
<script>
    export default{
        name: 'mySetting',
        data() {
            return {
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

        },
        mounted() {

        }
    }
</script>
<style lang="scss">
    .vchat-mySetting{
        width:1200px;
        margin: 0 auto;
        padding: 30px 0;
        .vchat-setingList{
            width:320px;
            padding: 0 30px;
            box-sizing: border-box;
            li{
                width:100%;
                padding: 12px 0;
                cursor: pointer;
                border-radius: 5px;
                padding-left: 20px;
                box-sizing: border-box;
                text-align: left;
                a{
                    display: block;
                    color: #323232;
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
                background-color: #27cac7;
            }
            li.active a{
                color: #fff;
            }
        }
        .vchat-seting-container{
            width:880px;
            background-color: #f5f5f5;
        }
    }
</style>