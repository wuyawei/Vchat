<template>
    <div class="vchat-mySetting">
        <ul class="vchat-setingList vchat-flexBetween">
            <li v-for="(v, i) in setingList" :key="i">
                <i class="iconfont"></i>
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
                        class: ''
                    },
                    {
                        name: '主题设置',
                        link: '',
                        class: ''
                    },
                    {
                        name: '聊天气泡',
                        link: '',
                        class: ''
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
    .mySetting{
        width:1200px;
        margin: 0 auto;
        .vchat-setingList{
            width:320px;
        }
        .vchat-seting-container{
            width:880px;
        }
    }
</style>