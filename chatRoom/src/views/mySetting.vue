<template>
    <div class="vchat-mySetting vchat-flexBetween">
        <ul class="vchat-setingList">
            <li v-for="(v, i) in setingList" :key="i">
                <i class="iconfont" :class="[v.class ? v.class : '']"></i>
                <span>{{v.name}}</span>
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
                        link: '',
                        class: 'icon-gerenziliao3'
                    },
                    {
                        name: '主题设置',
                        link: '',
                        class: 'icon-zhuti'
                    },
                    {
                        name: '聊天壁纸',
                        link: '',
                        class: 'icon-huanbeijing'
                    },
                    {
                        name: '聊天气泡',
                        link: '',
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
                padding: 15px 0;
                cursor: pointer;
                border-radius: 5px;
                padding-left: 20px;
                box-sizing: border-box;
                text-align: left;
                i{
                    font-size: 28px;
                    margin-right: 6px;
                    vertical-align: middle;
                }
            }
            li:hover{
                background-color: #f0f0f0;
            }
        }
        .vchat-seting-container{
            width:880px;
        }
    }
</style>