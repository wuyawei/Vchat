<template>
    <div class="vchat-emoji">
        <el-tabs type="border-card" tab-position="bottom">
            <el-tab-pane v-for="v in expressionList" :key="v.code">
                <span slot="label" class="emoji-tap" :lazy="true">
                    <img :src="IMG_URL + v.list[0]" alt="" class="emoji-tap-img">
                </span>
                <ul class="emoji-ul">
                    <li v-for="(m, n) in v.list" :key="n">
                        <img :src="IMG_URL + m" alt="">
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
                width:72px;
                height: 68px;
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.3s;
                transform: scale(1);
                img{
                    width:62px;
                }
            }
            li:hover{
                transform: scale(1.4);
            }
        }
    }
</style>