<template>
    <div class="vchat-emoji">
        <el-tabs type="border-card" tab-position="bottom">
            <el-tab-pane>
                <span slot="label" class="emoji-tap" :lazy="true">
                    <img :src="IMG_URL + '/expression/不二呆/00.gif'" alt="" class="emoji-tap-img">
                </span>
                <ul class="emoji-ul">
                    <li>
                        <img :src="IMG_URL + '/expression/不二呆/00.gif'" alt="">
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import api from '@/api';
    export default{
        name: 'emoji',
        data() {
            return {
                IMG_URL: process.env.IMG_URL,
                expressionList: []
            }
        },
        methods: {
            getExpression() {
                api.getExpression().then(r => {
                    if (r.code === 0) {
                        this.expressionList = r.data;
                    }
                });
            }
        },
        mounted() {
            this.getExpression();
        }
    }
</script>

<style lang="scss" scoped>
    .vchat-emoji{
        width:100%;
        height: 100%;
        .emoji-tap{
            width:40px;
            height: 100%;
            padding: 0 10px;
            overflow: hidden;
            display: inline-block;
            .emoji-tap-img{
                width:40px;
            }
        }
        .emoji-ul{
            width:100%;
            height: 202px;
            overflow-y: auto;
            li{
                display: inline-block;
                padding: 5px;
                box-sizing: border-box;
                width:70px;
                height: 68px;
                overflow: hidden;
                cursor: pointer;
                img{
                    width:60px;
                }
            }
            li:hover{
                background-color: rgba(0,0,0,0.1);
            }
        }
    }
</style>